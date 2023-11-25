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

    public async fetchJsonData(): Promise<void> {
        fetch('../channels.json')
            .then(response => response.json())
            .then(data => {
                this.channels = data;
        })
        .catch(error => {
          console.error('Error fetching JSON file:', error);
        });
    }
  }
  
  export default Channels;
  