/**
 * Spotify Web API with fixes and improvements from sonallux
 * You can use Spotify\'s Web API to discover music and podcasts, manage your Spotify library, control audio playback, and much more. Browse our available Web API endpoints using the sidebar at left, or via the navigation bar on top of this page on smaller screens.  In order to make successful Web API requests your app will need a valid access token. One can be obtained through <a href=\"https://developer.spotify.com/documentation/general/guides/authorization-guide/\">OAuth 2.0</a>.  The base URI for all Web API requests is `https://api.spotify.com/v1`.  Need help? See our <a href=\"https://developer.spotify.com/documentation/web-api/guides/\">Web API guides</a> for more information, or visit the <a href=\"https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer\">Spotify for Developers community forum</a> to ask questions and connect with other developers. 
 *
 * The version of the OpenAPI document: 2023.6.7
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ArtistObjectFollowers } from './artist-object-followers';
import { ImageObject } from './image-object';
import { ArtistObjectExternalUrls } from './artist-object-external-urls';


export interface ArtistObject { 
    external_urls?: ArtistObjectExternalUrls;
    followers?: ArtistObjectFollowers;
    /**
     * A list of the genres the artist is associated with. If not yet classified, the array is empty. 
     */
    genres?: Array<string>;
    /**
     * A link to the Web API endpoint providing full details of the artist. 
     */
    href?: string;
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the artist. 
     */
    id?: string;
    /**
     * Images of the artist in various sizes, widest first. 
     */
    images?: Array<ImageObject>;
    /**
     * The name of the artist. 
     */
    name?: string;
    /**
     * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist\'s popularity is calculated from the popularity of all the artist\'s tracks. 
     */
    popularity?: number;
    /**
     * The object type. 
     */
    type?: ArtistObject.TypeEnum;
    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the artist. 
     */
    uri?: string;
}
export namespace ArtistObject {
    export type TypeEnum = 'artist';
    export const TypeEnum = {
        Artist: 'artist' as TypeEnum
    };
}

