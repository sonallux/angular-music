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


/**
 * Allows to update the user interface based on which playback actions are available within the current context. 
 */
export interface CurrentlyPlayingContextObjectActions { 
    /**
     * Interrupting playback. Optional field.
     */
    interrupting_playback?: boolean;
    /**
     * Pausing. Optional field.
     */
    pausing?: boolean;
    /**
     * Resuming. Optional field.
     */
    resuming?: boolean;
    /**
     * Seeking playback location. Optional field.
     */
    seeking?: boolean;
    /**
     * Skipping to the next context. Optional field.
     */
    skipping_next?: boolean;
    /**
     * Skipping to the previous context. Optional field.
     */
    skipping_prev?: boolean;
    /**
     * Toggling repeat context flag. Optional field.
     */
    toggling_repeat_context?: boolean;
    /**
     * Toggling shuffle flag. Optional field.
     */
    toggling_shuffle?: boolean;
    /**
     * Toggling repeat track flag. Optional field.
     */
    toggling_repeat_track?: boolean;
    /**
     * Transfering playback between devices. Optional field.
     */
    transferring_playback?: boolean;
}
