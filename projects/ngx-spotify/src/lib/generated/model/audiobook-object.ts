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
import { AudiobookBaseExternalUrls } from './audiobook-base-external-urls';
import { ImageObject } from './image-object';
import { CopyrightObject } from './copyright-object';
import { AudiobookObjectAllOfChapters } from './audiobook-object-all-of-chapters';
import { NarratorObject } from './narrator-object';
import { AuthorObject } from './author-object';


export interface AudiobookObject { 
    /**
     * The author(s) for the audiobook. 
     */
    authors: Array<AuthorObject>;
    /**
     * A list of the countries in which the audiobook can be played, identified by their [ISO 3166-1 alpha-2](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code. 
     */
    available_markets: Array<string>;
    /**
     * The copyright statements of the audiobook. 
     */
    copyrights: Array<CopyrightObject>;
    /**
     * A description of the audiobook. HTML tags are stripped away from this field, use `html_description` field in case HTML tags are needed. 
     */
    description: string;
    /**
     * A description of the audiobook. This field may contain HTML tags. 
     */
    html_description: string;
    /**
     * The edition of the audiobook. 
     */
    edition?: string;
    /**
     * Whether or not the audiobook has explicit content (true = yes it does; false = no it does not OR unknown). 
     */
    explicit: boolean;
    external_urls: AudiobookBaseExternalUrls;
    /**
     * A link to the Web API endpoint providing full details of the audiobook. 
     */
    href: string;
    /**
     * The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. 
     */
    id: string;
    /**
     * The cover art for the audiobook in various sizes, widest first. 
     */
    images: Array<ImageObject>;
    /**
     * A list of the languages used in the audiobook, identified by their [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code. 
     */
    languages: Array<string>;
    /**
     * The media type of the audiobook. 
     */
    media_type: string;
    /**
     * The name of the audiobook. 
     */
    name: string;
    /**
     * The narrator(s) for the audiobook. 
     */
    narrators: Array<NarratorObject>;
    /**
     * The publisher of the audiobook. 
     */
    publisher: string;
    /**
     * The object type. 
     */
    type: AudiobookObject.TypeEnum;
    /**
     * The [Spotify URI](/documentation/web-api/concepts/spotify-uris-ids) for the audiobook. 
     */
    uri: string;
    /**
     * The number of chapters in this audiobook. 
     */
    total_chapters: number;
    chapters: AudiobookObjectAllOfChapters;
}
export namespace AudiobookObject {
    export type TypeEnum = 'audiobook';
    export const TypeEnum = {
        Audiobook: 'audiobook' as TypeEnum
    };
}


