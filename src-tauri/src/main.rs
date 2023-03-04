#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::env;
use std::fs;
use std::path::Path;
use serde::{Deserialize};

#[derive(Debug, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Arguments {
  body: Vec<String>
}

// fn folder_exists(name: &str) -> bool {
//   let path = Path::new(name);
//   path.exists() && path.is_dir()
// }

// fn go_to_dir(current_path: &str, dir_name: &str) -> Result<String, String> {
//   let dir = current_path.to_owned() + "/" + &dir_name;
//   if folder_exists(&dir) {
//     return Ok(dir);
//   }
//   Err(String::from("Folder do not exists"))
// }

fn get_files_and_subdirs(path: &str) -> Result<Vec<String>, std::io::Error> {
  let mut result: Vec<String> = Vec::new();

  for entry in fs::read_dir(path)? {
      let entry = entry?;
      let path = entry.path();
      let file_name = path.file_name().unwrap().to_str().unwrap();

      result.push(file_name.to_string());
  }

  return Ok(result);
}

#[tauri::command]
fn apply_command(command: String, args: Arguments) -> Vec<String> {
  if command == "ls" {
    return match get_files_and_subdirs(&args.body[0]) {
      Ok(output) => output,
      Err(_) => vec!["error".to_string()],
    };
  }
  // I need to send error
  vec!["test".to_string()]
}

#[tauri::command]
fn get_current_dir() -> String {
  let current_dir = env::current_dir().expect("Failed to get current directory");
  let current_dir_path = Path::new(&current_dir);
  format!("{}", current_dir_path.display())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_current_dir, apply_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
