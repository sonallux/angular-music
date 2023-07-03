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
import { AlbumObjectAllOfTracks } from './album-object-all-of-tracks';
import { CopyrightObject } from './copyright-object';
import { SimplifiedArtistObject } from './simplified-artist-object';
import { AlbumObjectAllOfExternalIds } from './album-object-all-of-external-ids';


export interface AlbumObjectAllOf { 
    /**
     * The artists of the album. Each artist object includes a link in `href` to more detailed information about the artist. 
     */
    artists?: Array<SimplifiedArtistObject>;
    tracks?: AlbumObjectAllOfTracks;
    /**
     * The popularity of the album, with 100 being the most popular. The popularity is calculated from the popularity of the album\'s individual tracks.
     */
    popularity?: number;
    /**
     * The label for the album.
     */
    label?: string;
    external_ids?: AlbumObjectAllOfExternalIds;
    /**
     * A list of the genres used to classify the album. (If not yet classified, the array is empty.)
     */
    genres?: Array<string>;
    /**
     * The copyright statements of the album.
     */
    copyrights?: Array<CopyrightObject>;
}

