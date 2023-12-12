use log::{debug, error, info, warn};
use reqwest;
use serde_json::Value;


#[tauri::command]
pub async fn get_server_request(url: &str) -> Result<String, String> {
    let response = reqwest::Client::new()
    .get(url)
    .send()
    .await
    .map_err(|err| {
        error!("GET request error: {:?}", err);
        err.to_string()
    })?;
    debug!("GET response: {:?}", response);

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

#[tauri::command]
pub async fn get_json(url: &str) -> Result<Value, String> {
    let response = reqwest::Client::new()
        .get(url)
        .send()
        .await
        .map_err(|err| {
            error!("GET request error: {:?}", err);
            err.to_string()
        })?;

    debug!("GET response: {:?}", response);

    info!("GET request to URL: {}", url);

    if response.status().is_redirection() {
        warn!("Redirection: {:?}", response);
    }

    if response.status().is_success() {
        let body_json: Value = response.json().await.map_err(|err| {
            error!("JSON deserialization error: {:?}", err);
            err.to_string()
        })?;

        Ok(body_json)
    } else if response.status().is_server_error() {
        error!("Server error: {:?}", response.status());
        Err(format!("Server error: {:?}", response.status()))
    } else {
        error!("Request was not successful: {:?}", response.status());
        Err(format!("Request was not successful: {:?}", response.status()))
    }
}

#[tauri::command]
pub async fn patch_server_request(config_data: Value, url: &str) -> Result<(), String> {
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
        if response.status().is_server_error() {
            error!("Server error: {:?}", response);
        }

        // Extract and return the error message from the response
        let error_message = response.text().await.unwrap_or_else(|_| {
            "Unable to retrieve the error message from the server response.".to_string()
        });

        // Log the error and return it
        error!("PATCH request was not successful: {:?}", error_message);
        Err(error_message)
    }
}


#[tauri::command]
pub async fn post_server_request(url: &str, value: Value) -> Result<(), String> {
    // Serialize the JSON data to a string
    let data = value.to_string();
    
    info!("POST data: {}", data);
    debug!("POST request to URL: {}", url);
    debug!("POST request to value: {:?}", value);
    let post_url = format!("{}{}", url, data).replace('"', "");
    info!("POST request to URL: {}", post_url);
    let response = reqwest::Client::new()
        .post(post_url)
        .header("Content-Type", "application/json") 
        .body(data)
        .send()
        .await
        .map_err(|err| {
            error!("POST request error: {:?}", err);
            err.to_string()
        })?;

    debug!("Response: {:?}", response);
  
    if response.status().is_success() {
        Ok(())
    } else {
        response.status().is_server_error().then(|| {
            error!("Server error: {:?}", response);
        });
        error!("POST request was not successful: {:?}", response);
        Err(format!("POST request was not successful: {:?}", response.text().await))
    }
}

   


   
