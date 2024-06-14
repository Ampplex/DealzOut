interface fetchLocation {
    (latitude: number, longitude: number): Promise<string[]>
}

export const getLocation: fetchLocation = async (latitude: number, longitude: number): Promise<string[]> => {
    const url = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=65a446e59c055987786503bfk76e0c2`;

    const resp = []
    const response = await fetch(url);

    const data = await response.json();
    const address: string = data.display_name;
    console.log(address);
    resp.push(data);
    return resp;
}