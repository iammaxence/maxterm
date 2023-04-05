#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::env;
use std::path::Path;

mod command;

#[tauri::command]
fn get_current_dir() -> String {
    let current_dir = env::current_dir().expect("Failed to get current directory");
    let current_dir_path = Path::new(&current_dir);
    format!("{}", current_dir_path.display())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_current_dir,
            command::clear,
            command::ls,
            command::cd,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
