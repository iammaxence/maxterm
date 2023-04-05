use std::{fs, path::Path};
use serde::Serialize;
use serde::Deserialize;

#[derive(Serialize, Deserialize)]
pub struct Filesystem {
    pub files: Vec<String>,
    pub folders: Vec<String>,
}

pub fn get_files_and_subdirs(path: &str) -> Result<Filesystem, std::io::Error> {
    let mut result = Filesystem {
        files: Vec::new(),
        folders: Vec::new(),
    };

    for entry in fs::read_dir(path)? {
        let entry = entry?;
        let path = entry.path();
        let file_name = path.file_name().unwrap().to_str().unwrap();

        if entry.file_type()?.is_dir() {
            result.folders.push(file_name.to_string());
        } else {
            result.files.push(file_name.to_string());
        }
    }

    return Ok(result);
}

fn folder_exists(my_path: &str) -> bool {
    let path = Path::new(my_path);
    path.exists() && path.is_dir()
}

pub fn build_path(current_path: &str, dir_name: &str) -> String {
    let mut dir = current_path.to_owned() + "/" + &dir_name;

    if dir_name.starts_with("/") {
        dir = (&dir_name).to_string();
    }

    dir
}

pub fn go_to_dir(current_path: &str, dir_name: &str) -> Result<String, String> {
    let dir = build_path(&current_path, &dir_name);

    if folder_exists(&dir) {
        return Ok(dir);
    }

    Err(String::from("Folder do not exists"))
}
