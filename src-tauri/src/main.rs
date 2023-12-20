// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde_json::json;
// use serde_json::json;
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, WindowBuilder, WindowUrl, Window, WindowEvent};
use tauri_plugin_positioner::{Position, WindowExt};
use tauri_plugin_store::StoreBuilder;


// use tauri_plugin_store::PluginBuilder;


// mod data_store;
// use data_store::{SharedData};

mod channels;

// the payload type must implement `Serialize` and `Clone`.
#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// Define a mutable option to hold the window instance
static mut CONFIG_WINDOW: Option<Window> = None;



fn main() {
    let show = CustomMenuItem::new("show".to_string(), "Show").accelerator("option+space");
    let config = CustomMenuItem::new("config".to_string(), "Config");
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide").accelerator("Cmd+H");

    let system_tray_menu = SystemTrayMenu::new()
        .add_item(show)
        .add_item(config)
        .add_item(hide)
        .add_item(quit);

    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                // SystemTrayEvent::LeftClick {
                //     // position: _,
                //     // size: _,
                //     position,
                //     size,
                //     ..
                // } => {
                //     println!("Left clicked at position {:?} with size {:?}", position, size);
                //     let window = app.get_window("main").unwrap();
                //     // use TrayCenter as initial window position
                //     let _ = window.move_window(Position::TrayCenter);
                //     if window.is_visible().unwrap() {
                //         window.hide().unwrap();
                //     } else {
                //         window.show().unwrap();
                //         window.set_focus().unwrap();
                //     }
                // }
                SystemTrayEvent::RightClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a right click");
                }
                SystemTrayEvent::DoubleClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    println!("system tray received a double click");
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "show" => {
                        let window: tauri::Window = app.get_window("main").unwrap();
                        // use TrayCenter as initial window position
                        let _ = window.move_window(Position::TrayCenter);
                        if window.is_visible().unwrap() {
                            window.hide().unwrap();
                        } else {
                            window.show().unwrap();
                            window.set_focus().unwrap();
                        }

                        // println!("-> Channel {:?} ", &channels::get_channel("promptApp"));

                        // window and app have the emit method, both work, but app is global and window is specific, however,
                        // I'm still learning one or the other, so I'm leaving both here for now
                        window.emit(&channels::get_channel("tray_menu_item_selected"), Payload { message: "show".into() }).unwrap();                        
                        // app.emit_all("event-name", Payload { message: "show".into() }).unwrap();
                    }
                    "config" => {
                        
                        println!("*** (1)");
                        // Check if the window is already created
                        if let Some(window) = unsafe { &CONFIG_WINDOW } {
                            println!("*** (2)");
                            // The window is already created, so just show it
                            // window.show().unwrap();
                            let _ = window.show().map_err(|e| {
                                eprintln!("Error showing window: {:?}", e);
                            });

                        } else {
                            // Assuming you have options for width and height
                            let width_option: Option<f64> = Some(1000.00);
                            let height_option: Option<f64> = Some(750.00);

                            // Use match or unwrap_or to handle the Option
                            let width: f64 = match width_option {
                                Some(value) => value,
                                None => 1000.00
                            };

                            let height: f64 = match height_option {
                                Some(value) => value,
                                None => 750.00
                            };

                            // The window is not created, so create it
                            let result = WindowBuilder::new(app, "local", WindowUrl::App("config.html".into()))
                                .fullscreen(false)
                                .resizable(false)
                                .title("User Configuration")
                                .inner_size(width, height)
                                .build();

                            if let Ok(window) = result {
                                // Save the window instance for future use
                                unsafe {
                                    CONFIG_WINDOW = Some(window.clone());
                                }

                                // Handle the window events
                                window.on_window_event(move |event| {
                                    // Check for the CloseRequested event
                                    // if let WindowEvent::CloseRequested { api , .. } = event {
                                    if let WindowEvent::CloseRequested{ .. } = event {
                                        // Handle the close event as needed
                                        // ...
                                        

                                        // Set CONFIG_WINDOW to None
                                        unsafe {
                                            CONFIG_WINDOW = None;
                                        }
                                    }
                                });                             

                                // Do something with the `window` instance, like showing it or setting its position
                                window.show().unwrap();
                                // ...
                            } else {
                                // Handle any potential errors during window creation
                                println!("Error creating second window!");
                            }
                        }

                        // let result = WindowBuilder::new(app, "local", WindowUrl::App("config.html".into()))
                        // .fullscreen(false)
                        // .resizable(false)
                        // .title("User Configuration")
                        // // .fullscreen(true)
                        // .build();
                  
                        // if let Ok(window) = result {
                        //     // Do something with the `window` instance, like showing it or setting its position
                        //     window.show().unwrap();
                        //     // ...
                        // } else {
                        //     // Handle any potential errors during window creation
                        //     println!("Error creating second window!");
                        // }
        
                        // window.emit(&channels::get_channel("tray_menu_item_selected"), Payload { message: "config".into() }).unwrap();                        
                    }

                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        let window = app.get_window("main").unwrap();
                        window.hide().unwrap();
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .setup(|app| {
        
        

            // let result = WindowBuilder::new(app, "local", WindowUrl::App("config.html".into()))
            //     .fullscreen(false)
            //     .resizable(false)
            //     .title("User Configuration")
            //     // .fullscreen(true)
            //     .build();
          
            // if let Ok(window) = result {
            //     // Do something with the `window` instance, like showing it or setting its position
            //     window.show().unwrap();
            //     // ...
            // } else {
            //     // Handle any potential errors during window creation
            //     println!("Error creating second window!");
            // }

            let mut store = StoreBuilder::new(app.handle(), "store.bin".parse()?).build();

            let _ = store.insert("a".to_string(), json!("b")); // note that values must be serd_json::Value to be compatible with JS
        
            println!("-> Store {:?}", store.get("a").unwrap());
            // #[cfg(debug_assertions)] // only include this code on debug builds
            // {
            //   let window = app.get_window("main").unwrap();
            //   window.open_devtools();
            // //   window.close_devtools();
            // }
        
            // listen to the `event-name` (emitted on any window)
            // let id = app.listen_global("event-name", |event| {
            app.listen_global(&channels::get_channel("error_occurred"), |event| {
              println!("{:?}", event.payload());
            });

            app.listen_global(&channels::get_channel("console_log_message"), |event| {
                println!("{:?}", event.payload());
              });
  
            // unlisten to the event using the `id` returned on the `listen_global` function
            // a `once_global` API is also exposed on the `App` struct
            // app.unlisten(id);
      
            // // emit the `event-name` event to all webview windows on the frontend
            // app.emit_all("event-name", Payload { message: "Tauri is awesome!".into() }).unwrap();
            Ok(())
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
