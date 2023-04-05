#[path = "../src/file_manager.rs"]
mod file_manager;

#[tauri::command]
pub fn clear() -> Vec<String> {
    return vec![];
}

#[tauri::command]
pub fn cd(args: Vec<String>) -> String {
    if args.len() == 1 {
        return "/".to_string();
    }
    if args.len() == 2 {
        return match file_manager::go_to_dir(&args[0], &args[1]) {
            Ok(output) => output,
            Err(_) => args[0].to_string(),
        };
    }
    return args[0].to_string();
}

#[tauri::command]
pub fn ls(args: Vec<String>) -> file_manager::Filesystem {
    let mut path = &args[0];

    if args.len() > 1 {
        path = &args[1];
    }

    return match file_manager::get_files_and_subdirs(&path) {
        Ok(output) => output,
        Err(_) => file_manager::Filesystem {
            files: Vec::new(),
            folders: Vec::new(),
        },
    }
}