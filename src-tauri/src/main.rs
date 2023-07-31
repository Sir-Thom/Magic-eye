// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//module start here
mod utils;
//module end here

use serde_json::Value;
use std::env;
use tauri::{command, generate_handler, Manager};
use utils::browser::open_web_browser;

use utils::config::{
    create_configuartion_file_setting, get_config_dir, get_config_file, get_config_file_content,
    update_settings_file,
};
use utils::os_setup_and_info::{get_os, setup_wayland};

#[command]
fn test() {
    println!("I  was invoked from JS!");
}

fn main() {
    if get_os() == "linux" {
        create_configuartion_file_setting();
        setup_wayland();
    } else if get_os() == "windows" {
        create_configuartion_file_setting();
    }

    tauri::Builder::default()
        .setup(|app| {
            let window = tauri::WindowBuilder::from_config(
                app,
                app.config().tauri.windows.get(0).unwrap().clone(),
            )
            .theme(theme());

            Ok(())
        })
        .invoke_handler(generate_handler![
            test,
            get_config_dir,
            open_web_browser,
            get_config_dir,
            get_config_file,
            get_config_file_content,
            update_settings_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn theme() -> Option<tauri::Theme> {
    let i = get_config_file_content();
    let json_value: Value = serde_json::from_str(&i).unwrap_or_default();
    let dark = Some(tauri::Theme::Dark);
    let light = Some(tauri::Theme::Light);
    if let Some(theme_value) = json_value.get("theme").and_then(Value::as_str) {
        if theme_value == "dark" {
            println!("{:?}", dark);
            return dark;
        } else if theme_value == "light" {
            println!("{:?}", light);
            return light;
        }
    }
    return None;
}
