export interface City {
    name: string;
    lat: number;
    lng: number;
}

export interface SingleDay {
    data: string;
    dayName: string;
    minTemp: number;
    maxTemp: number;
    windSpeedAverage: number;
}