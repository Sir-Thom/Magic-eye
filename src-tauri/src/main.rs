// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//module start here
mod utils;
//module end here
use std::env;
use tauri::Manager;
use utils::browser::open_web_browser;
use utils::config::{create_configuartion_file_setting, get_config_dir};
use utils::get_ip::get_ip;
use utils::os_setup_and_info::{get_os, setup_wayland};
#[tauri::command]
fn start_test() {
    println!("I was invoked from JS!");
}

#[tauri::command]
fn open_browser(url: String) {
    open_web_browser(url);
}

fn main() {
    if get_os() == "linux" {
        create_configuartion_file_setting();
        setup_wayland();
    } else if get_os() == "windows" {
        create_configuartion_file_setting();
    }

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start_test])
        .invoke_handler(tauri::generate_handler![get_config_dir])
        .invoke_handler(tauri::generate_handler![open_browser])
        .invoke_handler(tauri::generate_handler![get_ip])
        .setup(|app| {
            #[cfg(debug_assertions)]
            app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
