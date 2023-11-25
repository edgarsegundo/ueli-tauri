class Channels {
    private static instance: Channels | null = null;
    private channels: any = {};

    private constructor() {
    }

    public static getInstance(): Channels {
      if (!Channels.instance) {
        Channels.instance = new Channels();
      }
      return Channels.instance;
    }

    public get(channel: string): any {
        const value = this.channels[channel];
        if (value === undefined) {
            throw new Error(`Channel '${channel}' not found.`);
        }
        return value;
    }

    public fetchJsonData(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
          fetch('../channels.json')
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  this.channels = data;
                  resolve();
              })
              .catch(error => {
                  let error_str:string = `❌ 'Error fetching or processing JSON file: ${error}`
                  console.error(error_str);
                  reject(error_str);
              });
      });
    }
  }
  
  export default Channels;
  