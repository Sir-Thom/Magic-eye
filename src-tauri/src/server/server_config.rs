use log::{debug, error, info, warn};
use reqwest;
use serde_json::Value;

#[tauri::command]
pub async fn get_server_config_options(url: &str) -> Result<String, String> {
   
    let response = reqwest::Client::new()
        .get(url)
        .send()
        .await
        .map_err(|err| {
            error!("GET request error: {:?}", err);
            err.to_string()
        })?;

    info!("GET request to URL: {}", url);

    if response.status().is_redirection() {
        warn!("Redirection: {:?}", response);
    }

    if response.status().is_success() {
        // Deserialize the JSON response into a Value
        let body_json: Value = response.json().await.map_err(|err| {
            error!("JSON deserialization error: {:?}", err);
            err.to_string()
        })?;

        // Serialize the Value back to a JSON string
        let body_json_string = serde_json::to_string(&body_json).map_err(|err| {
            error!("JSON serialization error: {:?}", err);
            err.to_string()
        })?;

        Ok(body_json_string)
    } else if response.status().is_server_error() {
        error!("Server error: {:?}", response.status());
        Err(format!("Server error: {:?}", response.status()))
    } else {
        error!("Request was not successful: {:?}", response.status());
        Err(format!("Request was not successful: {:?}", response.status()))
    }
}

//#[tauri::command]
pub async fn patch_server_config_options(config_data: Value, url: &str) -> Result<(), String> {
    // Serialize the JSON data to a string
    let data = config_data.to_string();
    info!("PATCH data: {}", data);
    info!("PATCH request to URL: {}", url);


    let response = reqwest::Client::new()
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
        response.status().is_server_error().then(|| {
            error!("Server error: {:?}", response);
        });
        error!("PATCH request was not successful: {:?}", response);
        Err(format!("PATCH request was not successful: {:?}", response.text().await))
    }
}