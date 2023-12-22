#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use axum::Router;
use log::{debug, trace, info}; // Add info log level
use axum::http::{HeaderValue, Method};
use magic_eye::server::server_http_verb::{
    __cmd__get_server_request, get_server_request, __cmd__patch_server_request,
    patch_server_request, __cmd__get_json, get_json, __cmd__post_server_request,
    post_server_request,
};
use magic_eye::server::server_config::{
    __cmd__get_server_config_options, get_server_config_options,
};
use magic_eye::utils;
use magic_eye::utils::browser::{__cmd__open_web_browser, open_web_browser};
use magic_eye::utils::config::{
    __cmd__get_config_dir, __cmd__get_config_file, __cmd__get_config_file_content,
    __cmd__update_settings_file, __cmd__save_api_ip, get_config_dir, get_config_file,
    get_config_file_content, update_settings_file, save_api_ip, __cmd__get_api_ip,
    get_api_ip,
};
use std::{env, fs};
use tauri::{generate_handler, Manager};
use tauri_plugin_log::LogTarget;
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;
use utils::config::create_configuration_file_setting;
use utils::os_setup_and_info::setup_wayland;

const PORT: u16 = 16780;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Close splashscreen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().expect("Failed to close splashscreen");
    }
    // Show main window
    window.get_window("main").expect("Main window not found").show().expect("Failed to show main window");
}


fn main() -> Result<(), Box<dyn std::error::Error>> {
    create_configuration_file_setting();
    #[cfg(target_os = "linux")]
    setup_wayland();
    info!("Webkit version: {:?}", tauri::webview_version());
    
    trace!("config directory location: {:?}", get_config_dir());
    info!(
        "{:?}",
        tauri::api::path::app_log_dir(&tauri::Config::default())
            .unwrap()
            .to_str()
    );

    let context = tauri::generate_context!();
    let builder = tauri::Builder::default().plugin(
        tauri_plugin_log::Builder::default()
            .targets([
                LogTarget::Stdout,
                LogTarget::Webview,
                LogTarget::Folder(tauri::api::path::app_log_dir(&tauri::Config::default()).expect("Failed to get log folder").clone()),
            ])
            .build(),
    );

    builder
        .setup(move |app| {
            let main_window = app.get_window("main").expect("Main window not found");
            debug!("main_window url: : {:?}", main_window.url());
            
            let resource_path = app
                .path_resolver()
                .resolve_resource("assets")
                .expect("failed to resolve resource");

            debug!("resource_path: {:?}", resource_path);

            tauri::api::path::app_data_dir(&tauri::Config::default())
                .expect("Failed to get app data dir")
                .push("magiceEye/assets");

            tauri::async_runtime::spawn(async move {
                debug!("Initializing...");
                let serve_dir = ServeDir::new(resource_path.to_str().expect("Failed to convert resource path to string"));
                let _files = fs::read_dir(resource_path).map(|res| res.map(|e| e.expect("error").path()));
                debug!("files: {:?}", _files);

                let axum_app = Router::new().nest_service("/", serve_dir).layer(
                    CorsLayer::new()
                        .allow_origin("*".parse::<HeaderValue>().expect("Failed to parse header value"))
                        .allow_methods([Method::GET]),
                );

               let listener = tokio::net::TcpListener::bind(&format!("127.0.0.1:{}", PORT)).await.expect("Failed to bind to port");
               axum::serve(listener, axum_app).await.unwrap();
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
            patch_server_request,
            close_splashscreen,
            get_server_request,
            save_api_ip,
            get_json,
            post_server_request,
            get_api_ip
        ])
        .run(context)
        .expect("error while running tauri application");

    Ok(())
}
#[cfg(test)]
mod tests {
   use magic_eye::utils::config::get_config_dir;
   use tauri::api::path::app_config_dir;
 
   #[test]
   fn test_get_config_dir() {
       let result = get_config_dir();
       assert!(result.contains(&app_config_dir(&tauri::Config::default()).unwrap().to_str().unwrap().to_string()));
   }

    #[test]
    fn test_create_configuration_file_setting() {
        let result = get_config_dir();
        assert!(result.contains(&app_config_dir(&tauri::Config::default()).unwrap().to_str().unwrap().to_string()));
    }
 }



