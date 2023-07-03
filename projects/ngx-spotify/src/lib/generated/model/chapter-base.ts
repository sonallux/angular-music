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
import { ChapterBaseRestrictions } from './chapter-base-restrictions';
import { EpisodeBaseResumePoint } from './episode-base-resume-point';
import { ImageObject } from './image-object';
import { EpisodeBaseExternalUrls } from './episode-base-external-urls';


export interface ChapterBase { 
    /**
     * A URL to a 30 second preview (MP3 format) of the episode. `null` if not available. 
     */
    audio_preview_url: string;
    /**
     * A list of the countries in which the chapter can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. 
     */
    available_markets?: Array<string>;
    /**
     * The number of the chapter 
     */
    chapter_number: number;
    /**
     * A description of the episode. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. 
     */
    description: string;
    /**
     * A description of the episode. This field may contain HTML tags. 
     */
    html_description: string;
    /**
     * The episode length in milliseconds. 
     */
    duration_ms: number;
    /**
     * Whether or not the episode has explicit content (true = yes it does; false = no it does not OR unknown). 
     */
    explicit: boolean;
    external_urls: EpisodeBaseExternalUrls;
    /**
     * A link to the Web API endpoint providing full details of the episode. 
     */
    href: string;
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode. 
     */
    id: string;
    /**
     * The cover art for the episode in various sizes, widest first. 
     */
    images: Array<ImageObject>;
    /**
     * True if the episode is playable in the given market. Otherwise false. 
     */
    is_playable: boolean;
    /**
     * A list of the languages used in the episode, identified by their [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639) code. 
     */
    languages: Array<string>;
    /**
     * The name of the episode. 
     */
    name: string;
    /**
     * The date the episode was first released, for example `\"1981-12-15\"`. Depending on the precision, it might be shown as `\"1981\"` or `\"1981-12\"`. 
     */
    release_date: string;
    /**
     * The precision with which `release_date` value is known. 
     */
    release_date_precision: ChapterBase.ReleaseDatePrecisionEnum;
    resume_point: EpisodeBaseResumePoint;
    /**
     * The object type. 
     */
    type: ChapterBase.TypeEnum;
    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the episode. 
     */
    uri: string;
    restrictions?: ChapterBaseRestrictions;
}
export namespace ChapterBase {
    export type ReleaseDatePrecisionEnum = 'year' | 'month' | 'day';
    export const ReleaseDatePrecisionEnum = {
        Year: 'year' as ReleaseDatePrecisionEnum,
        Month: 'month' as ReleaseDatePrecisionEnum,
        Day: 'day' as ReleaseDatePrecisionEnum
    };
    export type TypeEnum = 'episode';
    export const TypeEnum = {
        Episode: 'episode' as TypeEnum
    };
}


