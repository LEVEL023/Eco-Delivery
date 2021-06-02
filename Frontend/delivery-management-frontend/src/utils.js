import { Loader } from "@googlemaps/js-api-loader";
import { GOOGLE_MAP_API_KEY } from './constants';

export const mapLoader = () => {
    const loader = new Loader({
      apiKey: GOOGLE_MAP_API_KEY,
      version: "weekly",
      libraries: ['drawing', 'places'],
    });
    console.log(loader)
    return loader.load()
}