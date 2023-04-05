#[path = "../src/file_manager.rs"]
mod file_manager;

#[test]
fn test_get_files_and_subdirs() {
    let path = ".";
    let result: file_manager::Filesystem = file_manager::get_files_and_subdirs(path).unwrap();
    assert!(result.files.len() > 0);
    assert!(result.folders.len() > 0);

    let path = "non-existent-directory";
    assert!(file_manager::get_files_and_subdirs(path).is_err());
}

#[test]
fn test_build_path() {
    let current_path = "/home/user/projects";
    let dir_name = "my_project";
    let result = file_manager::build_path(current_path, dir_name);
    assert_eq!(result, "/home/user/projects/my_project");
}

#[test]
fn test_build_path_with_absolute_path() {
    let current_path = "/home/user/projects";
    let dir_name = "/var/www";
    let result = file_manager::build_path(current_path, dir_name);
    assert_eq!(result, "/var/www");
}

#[test]
fn test_go_to_dir_success() {
    let current_path = ".";
    let dir_name = "tests";
    let result = file_manager::go_to_dir(current_path, dir_name);
    assert!(result.is_ok());
}

#[test]
fn test_go_to_dir_error() {
    let current_path = ".";
    let dir_name = "non_existent_folder";
    let result = file_manager::go_to_dir(current_path, dir_name);
    assert!(result.is_err());
    assert_eq!(result.unwrap_err(), "Folder do not exists");
}
