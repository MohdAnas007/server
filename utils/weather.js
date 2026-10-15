export async function getTemperature(City) {
    const city=City.toUpperCase();
    const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    ).then(res => res.json());

    if (!geo.results?.length) throw new Error("City not found");

    const { latitude, longitude } = geo.results[0];

    const data = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    ).then(res => res.json());

    return data.current.temperature_2m;
}
