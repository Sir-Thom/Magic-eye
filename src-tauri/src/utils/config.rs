use serde::{Deserialize, Serialize};
use serde_json;
use tauri::Theme;

use std::env;
use std::env::var;
use std::fs;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
use tauri::api::path;
#[derive(Debug, Serialize, Deserialize)]
pub struct Setting {
    ip_adress: [u8; 4],
    theme: [String; 2],
}
#[derive(Debug, Serialize, Deserialize)]
pub struct SettingConf {
    theme: String,
}
impl SettingConf {
    fn new() -> SettingConf {
        SettingConf {
            theme: "Dark".to_string(),
        }
    }
    fn default() -> SettingConf {
        SettingConf {
            theme: "Dark".to_string(),
        }
    }
}

impl Setting {
    fn default() -> Setting {
        Setting {
            ip_adress: [127, 0, 0, 1],
            theme: ["Dark".to_string(), "Light".to_string()],
        }
    }
}
const APP_NAME: &str = "magicEye";
#[tauri::command]
pub fn create_configuartion_file_setting() {
    let setting = SettingConf::default();
    if env::consts::OS == "linux" {
        let config_home = var("XDG_CONFIG_HOME")
            .or_else(|_| var("HOME").map(|home| format!("{}/.config", home)))
            .unwrap();

        let conf_dir = format!("{}/{}", config_home, APP_NAME);
        let path_config_file = format!("{}/{}", conf_dir, "settings.json");

        // Create the directory if it doesn't exist
        if !Path::new(&conf_dir).exists() {
            fs::create_dir_all(&conf_dir).expect("failed to create config directory");
            fs::create_dir_all(&config_home).expect("failed to create config directory");
        }

        if !Path::new(&path_config_file).exists() {
            // Create the file if it doesn't exist
            //get all value from setting
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
pub fn get_config_dir() -> String {
    print!(
        "{:?}",
        path::config_dir().unwrap().to_string_lossy().to_string() + "/" + APP_NAME
    );
    path::config_dir().unwrap().to_string_lossy().to_string() + "/" + APP_NAME
}
#[tauri::command]
pub fn get_config_file() -> String {
    path::config_dir().unwrap().to_string_lossy().to_string()
        + "/"
        + APP_NAME
        + "/"
        + "settings.json"
}
#[tauri::command]
pub fn get_config_file_content() -> String {
    let path_config_file = get_config_file();
    let mut file = File::open(&path_config_file).unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    contents
}
#[tauri::command]
pub fn update_settings_file(new_settings: SettingConf) {
    let path_config_file = get_config_file();
    let json_data = serde_json::to_string_pretty(&new_settings).unwrap();
    print!("{}", json_data);
    let mut file = File::create(&path_config_file).unwrap();
    file.write_all(json_data.as_bytes()).unwrap();
}
