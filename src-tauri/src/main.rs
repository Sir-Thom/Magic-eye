// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

//module start here
mod utils;
//module end here

use std::{env, fs};

use axum::http::{HeaderValue, Method};
use axum::Router;
use tauri::{command, generate_handler};
use tauri::{utils::config::AppUrl, WindowUrl};
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;
use utils::browser::open_web_browser;

use utils::config::{
    create_configuartion_file_setting, get_config_dir, get_config_file, get_config_file_content,
    update_settings_file,
};
use utils::os_setup_and_info::setup_wayland;

#[command]
fn test() {
    println!("I  was invoked from JS!");
}

#[tokio::main]
async fn main() {
    let port = 1420; //is_free(1420).then_some(1420).expect("Port is not free");
                     // println!("Port is {}", port);

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());
    #[cfg(target_os = "linux")]
    create_configuartion_file_setting();
    setup_wayland();

    #[cfg(target_os = "windows")]
    create_configuartion_file_setting();

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(|app| {
            let resource_path = app
                .path_resolver()
                .resolve_resource("assets")
                .expect("failed to resolve resource");

            tauri::api::path::app_data_dir(&tauri::Config::default())
                .unwrap()
                .push("magiceEye/assets");

            println!("{}", resource_path.as_path().display());

            // https://github.com/tranxuanthang/lrcget/commit/0a2fe9943e40503a1dc5d9bf291314f31ea66941
            // https://github.com/tauri-apps/tauri/issues/3725#issuecomment-1552804332

            tokio::spawn(async move {
                // let current_dir = current_dir().unwrap();
                //let current_dir_str = current_dir.as_path().to_str().unwrap();
                let serve_dir = ServeDir::new(resource_path.to_str().unwrap());

                //get all files in the directory serve_dir
                let files = fs::read_dir(resource_path.to_str().unwrap())
                    .unwrap()
                    .map(|res| res.map(|e| e.path()))
                    .collect::<Result<Vec<_>, std::io::Error>>()
                    .unwrap();
                //print all file names

                println!("{:?}", files);

                let axum_app = Router::new().nest_service("/", serve_dir).layer(
                    CorsLayer::new()
                        .allow_origin("*".parse::<HeaderValue>().unwrap())
                        .allow_methods([Method::GET]),
                );
                axum::Server::bind(&"127.0.0.1:16780".parse().unwrap())
                    .serve(axum_app.into_make_service())
                    .await
                    .unwrap();
            });

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
        .run(context)
        .expect("error while running tauri application");
}
