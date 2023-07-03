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
import { SimplifiedArtistObject } from './simplified-artist-object';
import { SimplifiedTrackObjectExternalUrls } from './simplified-track-object-external-urls';
import { SimplifiedTrackObjectLinkedFrom } from './simplified-track-object-linked-from';
import { SimplifiedTrackObjectRestrictions } from './simplified-track-object-restrictions';


export interface SimplifiedTrackObject { 
    /**
     * The artists who performed the track. Each artist object includes a link in `href` to more detailed information about the artist.
     */
    artists?: Array<SimplifiedArtistObject>;
    /**
     * A list of the countries in which the track can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. 
     */
    available_markets?: Array<string>;
    /**
     * The disc number (usually `1` unless the album consists of more than one disc).
     */
    disc_number?: number;
    /**
     * The track length in milliseconds.
     */
    duration_ms?: number;
    /**
     * Whether or not the track has explicit lyrics ( `true` = yes it does; `false` = no it does not OR unknown).
     */
    explicit?: boolean;
    external_urls?: SimplifiedTrackObjectExternalUrls;
    /**
     * A link to the Web API endpoint providing full details of the track.
     */
    href?: string;
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track. 
     */
    id?: string;
    /**
     * Part of the response when [Track Relinking](/documentation/web-api/concepts/track-relinking/) is applied. If `true`, the track is playable in the given market. Otherwise `false`. 
     */
    is_playable?: boolean;
    linked_from?: SimplifiedTrackObjectLinkedFrom;
    restrictions?: SimplifiedTrackObjectRestrictions;
    /**
     * The name of the track.
     */
    name?: string;
    /**
     * A URL to a 30 second preview (MP3 format) of the track. 
     */
    preview_url?: string;
    /**
     * The number of the track. If an album has several discs, the track number is the number on the specified disc. 
     */
    track_number?: number;
    /**
     * The object type: \"track\". 
     */
    type?: string;
    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the track. 
     */
    uri?: string;
    /**
     * Whether or not the track is from a local file. 
     */
    is_local?: boolean;
}

