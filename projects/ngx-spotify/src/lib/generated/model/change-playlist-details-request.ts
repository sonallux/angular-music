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


export interface ChangePlaylistDetailsRequest { 
  [key: string]: any | any;


    /**
     * The new name for the playlist, for example `\"My New Playlist Title\"` 
     */
    name?: string;
    /**
     * If `true` the playlist will be public, if `false` it will be private. 
     */
    _public?: boolean;
    /**
     * If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/> _**Note**: You can only set `collaborative` to `true` on non-public playlists._ 
     */
    collaborative?: boolean;
    /**
     * Value for playlist description as displayed in Spotify Clients and in the Web API. 
     */
    description?: string;
}
