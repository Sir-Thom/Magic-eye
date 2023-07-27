// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//module start here
mod utils;
//module end here

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
    println!("I was invoked from JS!");
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
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();
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
