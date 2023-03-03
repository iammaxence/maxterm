#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::env;
use std::path::Path;

fn folder_exists(name: &str) -> bool {
  let path = Path::new(name);
  path.exists() && path.is_dir()
}

fn goToDir(currentPath: &str, dirName: &str) -> Result<String, String> {
  let dir = currentPath.to_owned() + "/" + &dirName;
  if folder_exists(&dir) {
    Ok::<Result<String, String>>(&dir);
  }
  Err(String::from("Folder do not exists"))
}

#[tauri::command]
fn applyCommand(cmd: &str, body: &Vec<String>) -> Result<String, String> {
  if cmd == "cd" {
    Ok::<String, String>(goToDir(&body[0], &body[1]));
  }
  Err(String::from("Unknow command"))
}

#[tauri::command]
fn getCurrentDir() -> String {
  let current_dir = env::current_dir().expect("Failed to get current directory");
  let current_dir_path = Path::new(&current_dir);
  format!("{}", current_dir_path.display())
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![getCurrentDir, applyCommand])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
