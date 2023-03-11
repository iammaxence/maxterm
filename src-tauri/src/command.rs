#[path = "../src/file_manager.rs"]
mod file_manager;

#[tauri::command]
pub fn clear() -> Vec<String> {
  return vec![];
}

#[tauri::command]
pub fn ls(args: Vec<String>) ->Vec<String> {
  let mut path = &args[0];

  if args.len() > 1 {
   path = &args[1];
  }

  return match file_manager::get_files_and_subdirs(&path) {
    Ok(output) => output,
    Err(_) => vec![],
  };
}