use log::{debug, error, info, trace, warn};
use serde::{Deserialize, Serialize};
use serde_json;
use std::env;
use std::fs::{create_dir_all, File};
use std::io::{Read, Write};
use std::path::{Path, PathBuf};


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

const APP_NAME: &str = "Magic_eye";
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
            api_ip: Some("127.0.0.1:9997".to_string()),
        }
    }
}

impl Default for Setting {
    fn default() -> Self {
        Setting {
            placeholder: PlaceholderOption::PlaceholderSmpte.get_path_placeholder(),
            api_ip: Some("127.0.0.1:9997".to_string()),
        }
    }
}


#[tauri::command]
pub fn create_configuration_file_setting() {
    match env::consts::OS {
        "linux" => {
            let config_home = env::var("XDG_CONFIG_HOME")
                .or_else(|_| env::var("HOME").map(|home| format!("{}/.config", home)))
                .unwrap_or_default();
            debug!("config_home: {}", config_home);
            let conf_dir = PathBuf::from(&config_home).join(APP_NAME);
            let path_config_file = conf_dir.join(SETTINGS_FILE_NAME);
            info!("path_config_file: {:?}", path_config_file);

            if !Path::new(&conf_dir).exists() {
                create_dir_all(&conf_dir).expect("failed to create config directory");
                create_dir_all(&config_home).expect("failed to create config directory");
                error!(
                    "failed to create config directory for linux: {}",
                    config_home
                );
            }

         

            if !Path::new(&path_config_file).exists() {
                let json_data = serde_json::to_string_pretty(&Setting::new()).unwrap();
                trace!("json data for config file: {}", json_data);
                let mut file = File::create(&path_config_file).unwrap();
                file.write_all(json_data.as_bytes()).unwrap();
                info!("config file created");
            }
        }
        "windows" => {
            let app_data_dir = env::var("APPDATA").unwrap_or_default();
            debug!("APPDATA directory: {}", app_data_dir);
            let conf_dir = PathBuf::from(&app_data_dir).join(APP_NAME);
            let path_config_file = conf_dir.join(SETTINGS_FILE_NAME);
            info!("Path to config file: {:?}", path_config_file);

            if !Path::new(&conf_dir).exists() {
                create_dir_all(&conf_dir).expect("Failed to create config directory");
                error!(
                    "Failed to create config directory for Windows: {:?}",
                    conf_dir
                );
            }

           
            if !Path::new(&path_config_file).exists() {
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
        dirs_next::config_dir().unwrap().to_string_lossy().to_string() + "/" + APP_NAME
    );
    dirs_next::config_dir().unwrap().to_string_lossy().to_string() + "/" + APP_NAME
}

#[tauri::command]
pub fn get_config_file() -> String {
    debug!(
        "config file location: {:?}",
        dirs_next::config_dir().unwrap().to_string_lossy().to_string()
            + "/"
            + APP_NAME
            + "/"
            + SETTINGS_FILE_NAME
    );
    dirs_next::config_dir().unwrap().to_string_lossy().to_string()
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
pub fn update_settings_file(new_settings: String) -> Result<(), String> {
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
    Ok(())
}
#[tauri::command]
pub fn get_api_ip() -> String{
    let path_config_file = get_config_file();
    let mut file = File::open(&path_config_file).unwrap();
    trace!("file: {:?}", file);
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    debug!("content: {}", contents);
    let settings: Setting = serde_json::from_str(&contents).unwrap();
    debug!("settings: {:?}", settings);
    let api_ip = settings.api_ip.unwrap();
    debug!("api_ip: {:?}", api_ip);
    api_ip

}

#[tauri::command]
pub fn save_api_ip(api_ip: String) -> Result<(), String> {
    // Get the path to the config file
    let path_config_file = get_config_file();

    // Create a new Setting with the updated API IP
    let mut current_settings = Setting::default();
    current_settings.api_ip = Some(api_ip);

    // Serialize the updated settings to JSON
    let updated_settings = serde_json::to_string_pretty(&current_settings).map_err(|err| err.to_string())?;

    // Write the updated settings to the configuration file
    let mut file = File::create(&path_config_file).map_err(|err| err.to_string())?;
    file.write_all(updated_settings.as_bytes()).map_err(|err| err.to_string())?;

    info!("API IP saved to the config file");
    
    Ok(())
}