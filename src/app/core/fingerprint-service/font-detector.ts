const BASE_FONTS = ['monospace', 'sans-serif', 'serif'];

const STANDARD_FONTS = [
    'Andale Mono', 'Arial', 'Arial Black', 'Arial Hebrew', 'Arial MT', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS',
    'Bitstream Vera Sans Mono', 'Book Antiqua', 'Bookman Old Style',
    'Calibri', 'Cambria', 'Cambria Math', 'Century', 'Century Gothic', 'Century Schoolbook', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Courier', 'Courier New',
    'Geneva', 'Georgia',
    'Helvetica', 'Helvetica Neue',
    'Impact',
    'Lucida Bright', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'LUCIDA GRANDE', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode',
    'Microsoft Sans Serif', 'Monaco', 'Monotype Corsiva', 'MS Gothic', 'MS Outlook', 'MS PGothic', 'MS Reference Sans Serif', 'MS Sans Serif', 'MS Serif', 'MYRIAD', 'MYRIAD PRO',
    'Palatino', 'Palatino Linotype',
    'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Semibold', 'Segoe UI Symbol',
    'Tahoma', 'Times', 'Times New Roman', 'Times New Roman PS', 'Trebuchet MS',
    'Verdana', 'Wingdings', 'Wingdings 2', 'Wingdings 3'
];

const EXTENDED_FONTS = [
    'Abadi MT Condensed Light', 'Academy Engraved LET', 'ADOBE CASLON PRO', 'Adobe Garamond', 'ADOBE GARAMOND PRO', 'Agency FB', 'Aharoni', 'Albertus Extra Bold', 'Albertus Medium', 'Algerian', 'Amazone BT', 'American Typewriter',
    'American Typewriter Condensed', 'AmerType Md BT', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Antique Olive', 'Aparajita', 'Apple Chancery', 'Apple Color Emoji', 'Apple SD Gothic Neo', 'Arabic Typesetting', 'ARCHER',
    'ARNO PRO', 'Arrus BT', 'Aurora Cn BT', 'AvantGarde Bk BT', 'AvantGarde Md BT', 'AVENIR', 'Ayuthaya', 'Bandy', 'Bangla Sangam MN', 'Bank Gothic', 'BankGothic Md BT', 'Baskerville',
    'Baskerville Old Face', 'Batang', 'BatangChe', 'Bauer Bodoni', 'Bauhaus 93', 'Bazooka', 'Bell MT', 'Bembo', 'Benguiat Bk BT', 'Berlin Sans FB', 'Berlin Sans FB Demi', 'Bernard MT Condensed', 'BernhardFashion BT', 'BernhardMod BT', 'Big Caslon', 'BinnerD',
    'Blackadder ITC', 'BlairMdITC TT', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bodoni MT', 'Bodoni MT Black', 'Bodoni MT Condensed', 'Bodoni MT Poster Compressed',
    'Bookshelf Symbol 7', 'Boulder', 'Bradley Hand', 'Bradley Hand ITC', 'Bremen Bd BT', 'Britannic Bold', 'Broadway', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Californian FB', 'Calisto MT', 'Calligrapher', 'Candara',
    'CaslonOpnface BT', 'Castellar', 'Centaur', 'Cezanne', 'CG Omega', 'CG Times', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charlesworth', 'Charter Bd BT', 'Charter BT', 'Chaucer',
    'ChelthmITC Bk BT', 'Chiller', 'Clarendon', 'Clarendon Condensed', 'CloisterBlack BT', 'Cochin', 'Colonna MT', 'Constantia', 'Cooper Black', 'Copperplate', 'Copperplate Gothic', 'Copperplate Gothic Bold',
    'Copperplate Gothic Light', 'CopperplGoth Bd BT', 'Corbel', 'Cordia New', 'CordiaUPC', 'Cornerstone', 'Coronet', 'Cuckoo', 'Curlz MT', 'DaunPenh', 'Dauphin', 'David', 'DB LCD Temp', 'DELICIOUS', 'Denmark',
    'DFKai-SB', 'Didot', 'DilleniaUPC', 'DIN', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Edwardian Script ITC', 'Elephant', 'English 111 Vivace BT', 'Engravers MT', 'EngraversGothic BT', 'Eras Bold ITC', 'Eras Demi ITC', 'Eras Light ITC', 'Eras Medium ITC',
    'EucrosiaUPC', 'Euphemia', 'Euphemia UCAS', 'EUROSTILE', 'Exotc350 Bd BT', 'FangSong', 'Felix Titling', 'Fixedsys', 'FONTIN', 'Footlight MT Light', 'Forte',
    'FrankRuehl', 'Fransiscan', 'Freefrm721 Blk BT', 'FreesiaUPC', 'Freestyle Script', 'French Script MT', 'FrnkGothITC Bk BT', 'Fruitger', 'FRUTIGER',
    'Futura', 'Futura Bk BT', 'Futura Lt BT', 'Futura Md BT', 'Futura ZBlk BT', 'FuturaBlack BT', 'Gabriola', 'Galliard BT', 'Gautami', 'Geeza Pro', 'Geometr231 BT', 'Geometr231 Hv BT', 'Geometr231 Lt BT', 'GeoSlab 703 Lt BT',
    'GeoSlab 703 XBd BT', 'Gigi', 'Gill Sans', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gill Sans MT Ext Condensed Bold', 'Gill Sans Ultra Bold', 'Gill Sans Ultra Bold Condensed', 'Gisha', 'Gloucester MT Extra Condensed', 'GOTHAM', 'GOTHAM BOLD',
    'Goudy Old Style', 'Goudy Stout', 'GoudyHandtooled BT', 'GoudyOLSt BT', 'Gujarati Sangam MN', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Gurmukhi MN', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'Heather', 'Heiti SC', 'Heiti TC', 'HELV',
    'Herald', 'High Tower Text', 'Hiragino Kaku Gothic ProN', 'Hiragino Mincho ProN', 'Hoefler Text', 'Humanst 521 Cn BT', 'Humanst521 BT', 'Humanst521 Lt BT', 'Imprint MT Shadow', 'Incised901 Bd BT', 'Incised901 BT',
    // tslint:disable-next-line: max-line-length
    'Incised901 Lt BT', 'INCONSOLATA', 'Informal Roman', 'Informal011 BT', 'INTERSTATE', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Jazz LET', 'Jenson', 'Jester', 'Jokerman', 'Juice ITC', 'Kabel Bk BT', 'Kabel Ult BT', 'Kailasa', 'KaiTi', 'Kalinga', 'Kannada Sangam MN',
    'Kartika', 'Kaufmann Bd BT', 'Kaufmann BT', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korinna BT', 'Kristen ITC', 'Krungthep', 'Kunstler Script', 'Lao UI', 'Latha', 'Leelawadee', 'Letter Gothic', 'Levenim MT', 'LilyUPC', 'Lithograph', 'Lithograph Light', 'Long Island',
    'Lydian BT', 'Magneto', 'Maiandra GD', 'Malayalam Sangam MN', 'Malgun Gothic',
    'Mangal', 'Marigold', 'Marion', 'Marker Felt', 'Market', 'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'Meiryo', 'Meiryo UI', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Tai Le',
    'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Minion', 'Minion Pro', 'Miriam', 'Miriam Fixed', 'Mistral', 'Modern', 'Modern No. 20', 'Mona Lisa Solid ITC TT', 'Mongolian Baiti',
    'MONO', 'MoolBoran', 'Mrs Eaves', 'MS LineDraw', 'MS Mincho', 'MS PMincho', 'MS Reference Specialty', 'MS UI Gothic', 'MT Extra', 'MUSEO', 'MV Boli',
    'Nadeem', 'Narkisim', 'NEVIS', 'News Gothic', 'News GothicMT', 'NewsGoth BT', 'Niagara Engraved', 'Niagara Solid', 'Noteworthy', 'NSimSun', 'Nyala', 'OCR A Extended', 'Old Century', 'Old English Text MT', 'Onyx', 'Onyx BT', 'OPTIMA', 'Oriya Sangam MN',
    'OSAKA', 'OzHandicraft BT', 'Palace Script MT', 'Papyrus', 'Parchment', 'Party LET', 'Pegasus', 'Perpetua', 'Perpetua Titling MT', 'PetitaBold', 'Pickwick', 'Plantagenet Cherokee', 'Playbill', 'PMingLiU', 'PMingLiU-ExtB',
    'Poor Richard', 'Poster', 'PosterBodoni BT', 'PRINCETOWN LET', 'Pristina', 'PTBarnum BT', 'Pythagoras', 'Raavi', 'Rage Italic', 'Ravie', 'Ribbon131 Bd BT', 'Rockwell', 'Rockwell Condensed', 'Rockwell Extra Bold', 'Rod', 'Roman', 'Sakkal Majalla',
    'Santa Fe LET', 'Savoye LET', 'Sceptre', 'Script', 'Script MT Bold', 'SCRIPTINA', 'Serifa', 'Serifa BT', 'Serifa Th BT', 'ShelleyVolante BT', 'Sherwood',
    'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signboard', 'SILKSCREEN', 'SimHei', 'Simplified Arabic', 'Simplified Arabic Fixed', 'SimSun', 'SimSun-ExtB', 'Sinhala Sangam MN', 'Sketch Rockwell', 'Skia', 'Small Fonts', 'Snap ITC', 'Snell Roundhand', 'Socket',
    'Souvenir Lt BT', 'Staccato222 BT', 'Steamer', 'Stencil', 'Storybook', 'Styllo', 'Subway', 'Swis721 BlkEx BT', 'Swiss911 XCm BT', 'Sylfaen', 'Synchro LET', 'System', 'Tamil Sangam MN', 'Technical', 'Teletype', 'Telugu Sangam MN', 'Tempus Sans ITC',
    'Terminal', 'Thonburi', 'Traditional Arabic', 'Trajan', 'TRAJAN PRO', 'Tristan', 'Tubular', 'Tunga', 'Tw Cen MT', 'Tw Cen MT Condensed', 'Tw Cen MT Condensed Extra Bold',
    'TypoUpright BT', 'Unicorn', 'Univers', 'Univers CE 55 Medium', 'Univers Condensed', 'Utsaah', 'Vagabond', 'Vani', 'Vijaya', 'Viner Hand ITC', 'VisualUI', 'Vivaldi', 'Vladimir Script', 'Vrinda', 'Westminster', 'WHITNEY', 'Wide Latin',
    'ZapfEllipt BT', 'ZapfHumnst BT', 'ZapfHumnst Dm BT', 'Zapfino', 'Zurich BlkEx BT', 'Zurich Ex BT', 'ZWAdobeF'];

/**
 *  Based mostly on https://github.com/Valve/fingerprintjs2
 */
export class FontDetector {

    // we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    testString = 'mmmmmmmmmmlli';

    // we test using 72px font size, we may use any size. I guess larger the better.
    testSize = '72px';

    document: Document;

    constructor(doc: Document) {
        this.document = doc;
    }

    public getFonts(extendedJsFonts?: boolean): string[] {

        let fontList = STANDARD_FONTS;

        if (extendedJsFonts) {
          fontList = fontList.concat(EXTENDED_FONTS);
        }

        // remove duplicate fonts
        fontList = fontList.filter((font, position) => {
            return fontList.indexOf(font) === position;
        });

        const h = this.document.getElementsByTagName('body')[0];

        // div to load spans for the base fonts
        const baseFontsDiv = this.document.createElement('div');

        // div to load spans for the fonts to detect
        const fontsDiv = this.document.createElement('div');

        // create spans for base fonts
        const baseFontsSpans = this.initializeBaseFontsSpans(baseFontsDiv);

        // add the spans to the DOM
        h.appendChild(baseFontsDiv);

        // get the default width for the three base fonts
        const defaultWidth = {};
        const defaultHeight = {};
        for (let index = 0, length = BASE_FONTS.length; index < length; index++) {
            defaultWidth[BASE_FONTS[index]] = baseFontsSpans[index].offsetWidth; // width for the default font
            defaultHeight[BASE_FONTS[index]] = baseFontsSpans[index].offsetHeight; // height for the default font
        }

        // create spans for fonts to detect
        const fontsSpans = this.initializeFontsSpans(fontsDiv, fontList);

        // add all the spans to the DOM
        h.appendChild(fontsDiv);

        const available = fontList.filter(font => {
            let detected = false;
            const fs = fontsSpans[font];
            for (let i = 0; i < BASE_FONTS.length; i++) {
                detected = (fs[i].offsetWidth !== defaultWidth[BASE_FONTS[i]] ||
                    fs[i].offsetHeight !== defaultHeight[BASE_FONTS[i]]);
                if (detected) {
                    return detected;
                }
            }
            return detected;
        });

        // remove spans from DOM
        h.removeChild(fontsDiv);
        h.removeChild(baseFontsDiv);

        return available;
    }

    private initializeBaseFontsSpans(div: HTMLDivElement): HTMLSpanElement[] {
        const spans: HTMLSpanElement[] = [];
        for (let index = 0, length = BASE_FONTS.length; index < length; index++) {
          const s = this.createSpan();
          s.style.fontFamily = BASE_FONTS[index];
          div.appendChild(s);
          spans.push(s);
        }
        return spans;
    }

    // creates spans for the fonts to detect and adds them to fontsDiv
    private initializeFontsSpans(fontsDiv: HTMLDivElement, fontList: string[]) {
        const spans = {};
        for (let i = 0, l = fontList.length; i < l; i++) {
            const fontSpans = [];
            for (let j = 0, numDefaultFonts = BASE_FONTS.length; j < numDefaultFonts; j++) {
                const s = this.createSpan();
                s.style.fontFamily = `'${fontList[i]}',${BASE_FONTS[j]}`;
                fontsDiv.appendChild(s);
                fontSpans.push(s);
            }
            spans[fontList[i]] = fontSpans; // Stores {fontName : [spans for that font]}
        }
        return spans;
    }

    // creates a span where the fonts will be loaded
    private createSpan(): HTMLSpanElement {
        const s = this.document.createElement('span');
        /*
         * We need this css as in some weird browser this
         * span elements shows up for a microSec which creates a
         * bad user experience
         */
        s.style.position = 'absolute';
        s.style.left = '-9999px';
        s.style.fontSize = this.testSize;

        // css font reset to reset external styles
        s.style.fontStyle = 'normal';
        s.style.fontWeight = 'normal';
        s.style.letterSpacing = 'normal';
        s.style.lineBreak = 'auto';
        s.style.lineHeight = 'normal';
        s.style.textTransform = 'none';
        s.style.textAlign = 'left';
        s.style.textDecoration = 'none';
        s.style.textShadow = 'none';
        s.style.whiteSpace = 'normal';
        s.style.wordBreak = 'normal';
        s.style.wordSpacing = 'normal';

        s.innerHTML = this.testString;
        return s;
    }

}
