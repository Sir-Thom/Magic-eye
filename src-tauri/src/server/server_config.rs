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

    // Check if the request was successful
    if response.status().is_success() {
        // Deserialize the JSON response into a Value
        let body_json: serde_json::Value = response.json().await.map_err(|err| err.to_string())?;

        // Serialize the Value back to a JSON string
        let body_json_string = serde_json::to_string(&body_json).map_err(|err| err.to_string())?;

        //println!("Response body: {}", body_json_string);
        Ok(body_json_string)
    } else {
        println!("Request was not successful: {:?}", response.status());
        Err(format!(
            "Request was not successful: {:?}",
            response.status()
        ))
    }
}
