use log::{debug, error, info, trace, warn};
use serde::{Deserialize, Serialize};
use serde_json;
use std::env;
use std::env::var;
use std::fs::{create_dir_all, File};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};
use tauri::api::path;

#[derive(Debug, Serialize, Deserialize)]
pub enum PlaceholderOption {
    PlaceholderSmpte,
    PlaceholderSmpte100,
    PlaceholderSmpte75,
    PlaceholderBall,
    PlaceholderBar,
    PlaceholderBlack,
    PlaceholderWhite,
    PlaceholderBlue,
    PlaceholderCheckers1,
    PlaceholderCheckers2,
    PlaceholderCheckers4,
    PlaceholderCheckers8,
    PlaceholderChromaZonePlate,
    PlaceholderCircular,
    PlaceholderColor,
    PlaceholderGradient,
    PlaceholderGreen,
    PlaceholderPinwheel,
    PlaceholderRed,
    PlaceholderSnow,
    PlaceholderSolidColor,
    PlaceholderSpokes,
    PlaceholderZonePlate,
}

#[derive(Debug, Serialize, Deserialize)]
struct Setting {
    placeholder: String,
    api_ip: Option<String>,
}

const APP_NAME: &str = "magicEye";
const SETTINGS_FILE_NAME: &str = "settings.json";

impl PlaceholderOption {
    pub fn get_path_placeholder(&self) -> String {
        match self {
            PlaceholderOption::PlaceholderSmpte => "placeholder-smpte".to_string(),
            PlaceholderOption::PlaceholderSmpte100 => "placeholder-smpte100".to_string(),
            PlaceholderOption::PlaceholderSmpte75 => "placeholder-smpte75".to_string(),
            PlaceholderOption::PlaceholderBall => "placeholder-ball".to_string(),
            PlaceholderOption::PlaceholderBar => "placeholder-bar".to_string(),
            PlaceholderOption::PlaceholderBlack => "placeholder-black".to_string(),
            PlaceholderOption::PlaceholderWhite => "placeholder-white".to_string(),
            PlaceholderOption::PlaceholderBlue => "placeholder-blue".to_string(),
            PlaceholderOption::PlaceholderCheckers1 => "placeholder-checkers1".to_string(),
            PlaceholderOption::PlaceholderCheckers2 => "placeholder-checkers2".to_string(),
            PlaceholderOption::PlaceholderCheckers4 => "placeholder-checkers4".to_string(),
            PlaceholderOption::PlaceholderCheckers8 => "placeholder-checkers8".to_string(),
            PlaceholderOption::PlaceholderChromaZonePlate => {
                "placeholder-chroma-zone-plate".to_string()
            }
            PlaceholderOption::PlaceholderCircular => "placeholder-circular".to_string(),
            PlaceholderOption::PlaceholderColor => "placeholder-color".to_string(),
            PlaceholderOption::PlaceholderGradient => "placeholder-gradient".to_string(),
            PlaceholderOption::PlaceholderGreen => "placeholder-green".to_string(),
            PlaceholderOption::PlaceholderPinwheel => "placeholder-pinwheel".to_string(),
            PlaceholderOption::PlaceholderRed => "placeholder-red".to_string(),
            PlaceholderOption::PlaceholderSnow => "placeholder-snow".to_string(),
            PlaceholderOption::PlaceholderSolidColor => "placeholder-solid-color".to_string(),
            PlaceholderOption::PlaceholderSpokes => "placeholder-spokes".to_string(),
            PlaceholderOption::PlaceholderZonePlate => "placeholder-zone-plate.webm".to_string(),
        }
    }
}

impl Setting {
    fn new() -> Setting {
        Setting {
            placeholder: PlaceholderOption::PlaceholderSmpte.get_path_placeholder(),
            api_ip: None, 
        }
    }
}
impl Default for Setting {
    fn default() -> Self {
        Setting {
            placeholder: PlaceholderOption::PlaceholderSmpte.get_path_placeholder(),
            api_ip: None, 
            
        }
    }
}

#[tauri::command]
pub fn create_configuartion_file_setting() {
    match env::consts::OS {
        "linux" => {
            let config_home = var("XDG_CONFIG_HOME")
                .or_else(|_| var("HOME").map(|home| format!("{}/.config", home)))
                .unwrap();
            debug!("config_home: {}", config_home);
            let conf_dir = PathBuf::from(&config_home).join(APP_NAME);
            let path_config_file = conf_dir.join(SETTINGS_FILE_NAME);
            info!("path_config_file: {:?}", path_config_file);

            // Create the directory if it doesn't exist
            if !Path::new(&conf_dir).exists() {
                create_dir_all(&conf_dir).expect("failed to create config directory");
                create_dir_all(&config_home).expect("failed to create config directory");
                error!(
                    "failed to create config directory for linux: {}",
                    config_home
                );
            }
            let asset_dir_path = tauri::api::path::app_data_dir(&tauri::Config::default())
                .unwrap()
                .to_str()
                .unwrap()
                .to_string()
                + APP_NAME
                + "/asset";
            trace!("asset_dir_path: {}", asset_dir_path);
            if !Path::new(&asset_dir_path).exists() {
                create_dir_all(&asset_dir_path).expect("failed to create config directory");
                error!(
                    "failed to create config directory for linux: {}",
                    asset_dir_path
                )
            }

            if !Path::new(&path_config_file).exists() {
                // Create the file if it doesn't exist
                //get all value from setting
                let json_data = serde_json::to_string_pretty(&Setting::new()).unwrap();
                trace!("json data for config file: {}", json_data);
                println!(
                    "json data: {}",
                    tauri::api::path::app_data_dir(&tauri::Config::default())
                        .unwrap()
                        .display()
                        .to_string()
                );
                let mut file = File::create(&path_config_file).unwrap();
                file.write_all(json_data.as_bytes()).unwrap();

                info!("config file created");
                // println!("{}", serde_json::to_string(&setting).unwrap());
            }
        }
        "windows" => {
            let app_data_dir = match var("APPDATA") {
                Ok(appdata) => appdata,
                Err(_) => {
                    error!("Failed to retrieve APPDATA environment variable");
                    return;
                }
            };

            debug!("APPDATA directory: {}", app_data_dir);
            let conf_dir = PathBuf::from(&app_data_dir).join(APP_NAME);
            let path_config_file = conf_dir.join(SETTINGS_FILE_NAME);
            info!("Path to config file: {:?}", path_config_file);

            // Create the directory if it doesn't exist
            if !Path::new(&conf_dir).exists() {
                create_dir_all(&conf_dir).expect("Failed to create config directory");
                error!(
                    "Failed to create config directory for Windows: {:?}",
                    conf_dir
                );
            }

            let asset_dir_path = tauri::api::path::app_data_dir(&tauri::Config::default())
                .unwrap()
                .to_str()
                .unwrap()
                .to_string()
                + APP_NAME
                + "/asset";
            trace!("Asset directory path: {}", asset_dir_path);
            if !Path::new(&asset_dir_path).exists() {
                create_dir_all(&asset_dir_path).expect("Failed to create config directory");
                error!(
                    "Failed to create config directory for Windows: {:?}",
                    asset_dir_path
                );
            }

            if !Path::new(&path_config_file).exists() {
                // Create the file if it doesn't exist
                // Get all values from setting
                let json_data = serde_json::to_string_pretty(&Setting::new()).unwrap();
                trace!("JSON data for config file: {}", json_data);

                let mut file = File::create(&path_config_file).unwrap();
                file.write_all(json_data.as_bytes()).unwrap();

                info!("Config file created");
            }
        }

        _ => {
            warn!("no file created for this OS");
            error!("Unsupported OS");
            println!("Unsupported OS");
        }
    }
}

#[tauri::command]
pub fn get_config_dir() -> String {
    debug!(
        "config directory location: {:?}",
        path::config_dir().unwrap().to_string_lossy().to_string() + "/" + APP_NAME
    );
    path::config_dir().unwrap().to_string_lossy().to_string() + "/" + APP_NAME
}

#[tauri::command]
pub fn get_config_file() -> String {
    debug!(
        "config file location: {:?}",
        path::config_dir().unwrap().to_string_lossy().to_string()
            + "/"
            + APP_NAME
            + "/"
            + SETTINGS_FILE_NAME
    );
    path::config_dir().unwrap().to_string_lossy().to_string()
        + "/"
        + APP_NAME
        + "/"
        + SETTINGS_FILE_NAME
}

#[tauri::command]
pub fn get_config_file_content() -> String {
    let path_config_file = get_config_file();
    debug!("config file location: {:?}", path_config_file);
    let mut file = File::open(&path_config_file).unwrap();
    trace!("file: {:?}", file);
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    debug!("content: {}", contents);
    contents
}

#[tauri::command]
pub fn update_settings_file(new_settings: String) -> Result<String, String> {
    // Deserialize the received JSON data into the Setting struct
    let new_settings: Setting =
        serde_json::from_str(&new_settings).map_err(|err| err.to_string())?;
    debug!("new_settings: {:?}", new_settings);
    

    let path_config_file = get_config_file();
    trace!("config file location: {:?}", path_config_file);
    let json_data = serde_json::to_string_pretty(&new_settings).map_err(|err| err.to_string())?;
    trace!("json data: {}", json_data);

    let mut file = File::create(&path_config_file).map_err(|err| err.to_string())?;
    file.write_all(json_data.as_bytes())
        .map_err(|err| err.to_string())?;

    info!("config file updated");
    // Return the JSON data back to TypeScript
    Ok(json_data)
}
#[tauri::command]
pub fn save_api_ip(api_ip: String) -> Result<String, String> {
    
    // Fetch the existing settings from the configuration file
    let current_settings = get_config_file_content();

    // Update the API IP in the settings
    let mut current_settings: Setting =
        serde_json::from_str(&current_settings).map_err(|err| err.to_string())?;
    current_settings.api_ip = Some(api_ip);
    debug!("current_settings: {:?}", current_settings);

    // Save the updated settings to the configuration file
    let updated_settings = serde_json::to_string_pretty(&current_settings).map_err(|err| err.to_string())?;
    let path_config_file = get_config_file();
    let mut file = File::create(&path_config_file).map_err(|err| err.to_string())?;
    file.write_all(updated_settings.as_bytes()).map_err(|err| err.to_string())?;

    info!("API IP saved to the config file");
    
    Ok("API IP saved".to_string())
}
