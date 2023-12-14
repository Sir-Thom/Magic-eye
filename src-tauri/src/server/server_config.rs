use log::{debug, error, info, warn};
use reqwest;
use serde_json::Value;

#[tauri::command]
pub async fn get_server_config_options(url: &str) -> Result<String, String> {
    let client = reqwest::Client::new();

    let response = client.get(url).send().await.map_err(|err| {
        error!("GET request error: {:?}", err);
        err.to_string()
    })?;

    info!("GET request to URL: {}", url);

    match response.status() {
        status if status.is_redirection() => {
            warn!("Redirection: {:?}", response);
            Ok("".to_string())
        }
        status if status.is_client_error() => {
            let err_msg = format!("Client error: {:?}", status);
            error!("{}", &err_msg);
            Err(err_msg)
        }
        status if status.is_success() => {
            let body_json: Value = response.json().await.map_err(|err| {
                error!("JSON deserialization error: {:?}", err);
                err.to_string()
            })?;

            let body_json_string = serde_json::to_string(&body_json).map_err(|err| {
                error!("JSON serialization error: {:?}", err);
                err.to_string()
            })?;

            Ok(body_json_string)
        }
        status if status.is_server_error() => {
            let err_msg = format!("Server error: {:?}", status);
            error!("{}", &err_msg);
            Err(err_msg)
        }
        status => {
            let err_msg = format!("Request was not successful: {:?}", status);
            error!("{}", &err_msg);
            Err(err_msg)
        }
    }
}

pub async fn patch_server_config_options(config_data: Value, url: &str) -> Result<(), String> {
    let client = reqwest::Client::new();

    let data = config_data.to_string();
    info!("PATCH data: {}", data);
    info!("PATCH request to URL:{}", url);
    let response = client
        .patch(url)
        .header("Content-Type", "application/json")
        .body(data)
        .send()
        .await
        .map_err(|err| {
            error!("PATCH request error: {:?}", err);
            err.to_string()
        })?;

    debug!("Response: {:?}", response);

    if response.status().is_success() {
        Ok(())
    } else {
        match response.status() {
            status if status.is_server_error() => {
                error!("Server error: {:?}", status);
            }
            status => {
                error!("PATCH request was not successful: {:?}", status);
            }
        }
        Err(response.text().await.unwrap_or_else(|_| "Failed to get response text".to_string()))
    }
}
