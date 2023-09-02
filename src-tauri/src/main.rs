// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use axum::http::{HeaderValue, Method};
use axum::Router;
use magic_eye::server::server_config::{
    __cmd__get_server_config_options, get_server_config_options,
};
use magic_eye::utils;
use magic_eye::utils::browser::{__cmd__open_web_browser, open_web_browser};
use magic_eye::utils::config::{
    __cmd__get_config_dir, __cmd__get_config_file, __cmd__get_config_file_content,
    __cmd__update_settings_file, get_config_dir, get_config_file, get_config_file_content,
    update_settings_file,
};
use std::{env, fs};
use tauri::{generate_handler, Manager};
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;
use utils::config::create_configuartion_file_setting;
use utils::os_setup_and_info::setup_wayland;
const PORT: u16 = 16780;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    #[cfg(target_os = "linux")]
    create_configuartion_file_setting();
    setup_wayland();

    #[cfg(target_os = "windows")]
    create_configuartion_file_setting();

    let context = tauri::generate_context!();
    let builder = tauri::Builder::default();

    builder
        .setup(move |app| {
            let main_window = app.get_window("main").unwrap();
            println!("main_window url: {}", main_window.url().to_string());

            let resource_path = app
                .path_resolver()
                .resolve_resource("assets")
                .expect("failed to resolve resource");

            tauri::api::path::app_data_dir(&tauri::Config::default())
                .unwrap()
                .push("magiceEye/assets");

            // https://github.com/tranxuanthang/lrcget/commit/0a2fe9943e40503a1dc5d9bf291314f31ea66941
            // https://github.com/tauri-apps/tauri/issues/3725#issuecomment-1552804332

            tokio::spawn(async move {
                let serve_dir = ServeDir::new(resource_path.to_str().unwrap());

                let _files =
                    fs::read_dir(resource_path).map(|res| res.map(|e| e.expect("error").path()));

                let axum_app = Router::new().nest_service("/", serve_dir).layer(
                    CorsLayer::new()
                        .allow_origin("*".parse::<HeaderValue>().unwrap())
                        .allow_methods([Method::GET]),
                );

                let _ = axum::Server::bind(&format!("127.0.0.1:{}", PORT).parse().unwrap())
                    .serve(axum_app.into_make_service())
                    .await;
            });
            Ok(())
        })
        .invoke_handler(generate_handler![
            get_config_dir,
            open_web_browser,
            get_config_dir,
            get_config_file,
            get_config_file_content,
            update_settings_file,
            get_server_config_options,
        ])
        .run(context)
        .expect("error while running tauri application");
    Ok(())
}
