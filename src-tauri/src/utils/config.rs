use serde::{Deserialize, Serialize};
use serde_json;
use std::env;
use std::env::var;
use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use tauri::api::path;
#[derive(Debug, Serialize, Deserialize)]
struct Setting {
    ip_adress: [u8; 4],
    theme: [String; 2],
}

#[tauri::command]
pub fn create_configuartion_file_setting() {
    let setting = Setting {
        ip_adress: [127, 0, 0, 1],
        theme: ["Dark".to_string(), "Light".to_string()],
    };
    if env::consts::OS == "linux" {
        let config_home = var("XDG_CONFIG_HOME")
            .or_else(|_| var("HOME").map(|home| format!("{}/.config", home)))
            .unwrap();

        let test_dir = format!("{}/{}", config_home, "Test");
        let path_config_file = format!("{}/{}", test_dir, "settings.json");

        // Create the directory if it doesn't exist
        if !Path::new(&test_dir).exists() {
            fs::create_dir_all(&test_dir).expect("failed to create config directory");
            fs::create_dir_all(&config_home).expect("failed to create config directory");
        }

        if !Path::new(&path_config_file).exists() {
            let json_data = serde_json::to_string_pretty(&setting).unwrap();
            let mut file = File::create(&path_config_file).unwrap();
            file.write_all(json_data.as_bytes()).unwrap();
            println!("{}", serde_json::to_string(&setting).unwrap());
        }
    } else if env::consts::OS == "windows" {
        println!("no implementation for now");
    }
}
#[tauri::command]
pub fn get_config_dir() -> Option<String> {
    path::config_dir().map(|path_buf| path_buf.to_string_lossy().into_owned())
}
