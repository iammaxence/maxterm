#[path = "../src/file_manager.rs"]
mod file_manager;

#[test]
fn test_get_files_and_subdirs() {
  let path = ".";
  let result = file_manager::get_files_and_subdirs(path).unwrap();
  assert!(result.len() > 0);

  let path = "non-existent-directory";
  assert!(file_manager::get_files_and_subdirs(path).is_err());
}