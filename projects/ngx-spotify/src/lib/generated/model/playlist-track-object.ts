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
import { PlaylistTrackObjectAddedBy } from './playlist-track-object-added-by';
import { PlaylistTrackObjectTrack } from './playlist-track-object-track';


export interface PlaylistTrackObject { 
    /**
     * The date and time the track or episode was added. _**Note**: some very old playlists may return `null` in this field._ 
     */
    added_at?: string;
    added_by?: PlaylistTrackObjectAddedBy;
    /**
     * Whether this track or episode is a [local file](/documentation/web-api/concepts/playlists/#local-files) or not. 
     */
    is_local?: boolean;
    track?: PlaylistTrackObjectTrack;
}

