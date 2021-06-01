import { Loader } from "@googlemaps/js-api-loader";

export const mapLoader = () => {
    const loader = new Loader({
      apiKey: "AIzaSyANAkyf2_ZVLmsOoSzNebhTssSSLCmFW10",
      version: "weekly",
      libraries: ['drawing', 'places'],
    });
    console.log(loader)
    return loader.load()
}