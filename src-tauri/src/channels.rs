use serde_json::Value;
use std::fs::File;
use std::io::Read;
use lazy_static::lazy_static;

const CHANNELS_FILE_PATH: &str = "../channels.json";

lazy_static! {
    // Define a public static variable for the channels
    pub static ref CHANNELS: Value = {
        // Read the JSON file
        let mut file = File::open(CHANNELS_FILE_PATH).expect(&format!("Unable to open file {:?}", CHANNELS_FILE_PATH));
        let mut contents = String::new();
        file.read_to_string(&mut contents)
            .expect(&format!("Unable to read file {:?}", CHANNELS_FILE_PATH));

        // Parse the JSON contents
        serde_json::from_str(&contents).expect(&format!("Unable to parse JSON file {:?}", CHANNELS_FILE_PATH))
    };
}

// Function to get a channel as a string
pub fn get_channel(channel_key: &str) -> String {
    // Access the channels using the provided key
    CHANNELS
        .get(channel_key)
        .and_then(|channel| channel.as_str().map(|s| s.to_string()))
        .expect(&format!("Channel not found for key: {:?}", channel_key))
}