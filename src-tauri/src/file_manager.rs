use std::fs;

pub fn get_files_and_subdirs(path: &str) -> Result<Vec<String>, std::io::Error> {
  let mut result: Vec<String> = Vec::new();

  for entry in fs::read_dir(path)? {
      let entry = entry?;
      let path = entry.path();
      let file_name = path.file_name().unwrap().to_str().unwrap();

      result.push(file_name.to_string());
  }

  return Ok(result);
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