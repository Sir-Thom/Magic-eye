// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//module start here
mod utils;
//module end here

use std::env;

use tauri::{command, generate_handler};
use tauri::{utils::config::AppUrl, WindowUrl};
use utils::browser::open_web_browser;

use utils::config::{
    create_configuartion_file_setting, get_config_dir, get_config_file, get_config_file_content,
    update_settings_file,
};
use utils::os_setup_and_info::{get_os, setup_wayland};

use crate::utils::config::get_ressource_path;
#[command]
fn test() {
    println!("I  was invoked from JS!");
}

fn main() {
    let port = 1420; //is_free(1420).then_some(1420).expect("Port is not free");

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());
    if get_os() == "linux" {
        create_configuartion_file_setting();
        setup_wayland();
    } else if get_os() == "windows" {
        create_configuartion_file_setting();
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(|app| Ok(()))
        .invoke_handler(generate_handler![
            test,
            get_config_dir,
            open_web_browser,
            get_config_dir,
            get_config_file,
            get_config_file_content,
            update_settings_file,
        ])
        .run(context)
        .expect("error while running tauri application");
}
