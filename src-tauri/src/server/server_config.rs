use log::{debug, error, info, warn};

use reqwest;

#[tauri::command]
pub async fn get_server_config_options(url: &str) -> Result<String, String> {
    let client = reqwest::Client::new();

    // Make the GET request
    let response = client
        .get(url)
        .send()
        .await
        .map_err(|err| err.to_string())?;
    debug!("Response: {:?}", response);
    // if empty response warn the user
    if response.status().is_redirection() {
        warn!("Redirection: {:?}", response);
    }

    if response.status().is_success() {
        // Deserialize the JSON response into a Value
        let body_json: serde_json::Value = response.json().await.map_err(|err| err.to_string())?;

        // Serialize the Value back to a JSON string
        let body_json_string = serde_json::to_string(&body_json).map_err(|err| err.to_string())?;
        info!("Response body: {}", body_json_string);
        Ok(body_json_string.into())
    } else if response.status().is_server_error() {
        error!(" error: {:?}", response.status());
        // if is unable to connect to the
        return Err(format!("Error:{:?}", response.status()).into());
    } else {
        error!("Request was not successful: {:?}", response.status());

        Err(format!("Request was not successful: {:?}", response.status()).into())
    }
}

#[tauri::command]
pub async fn post_server_config_options(url: &str) -> Result<String, String> {
    let client = reqwest::Client::new();

    let response = client
        .post(url)
        .send()
        .await
        .map_err(|err| err.to_string())?;
    debug!("Response: {:?}", response);

    if response.status().is_redirection() {
        warn!("Redirection: {:?}", response);
    }
    if response.status().is_success() {
        // Deserialize the JSON response into a Value
        let body_json: serde_json::Value = response.json().await.map_err(|err| err.to_string())?;

        // Serialize the Value back to a JSON string
        let body_json_string = serde_json::to_string(&body_json).map_err(|err| err.to_string())?;
        info!("Response body: {}", body_json_string);
        Ok(body_json_string.into())
    } else if response.status().is_server_error() {
        error!(" error: {:?}", response.status());
        // if is unable to connect to the
        return Err(format!("Error:{:?}", response.status()).into());
    } else {
        error!("Request was not successful: {:?}", response.status());

        Err(format!("Request was not successful: {:?}", response.status()).into())
    }
}
