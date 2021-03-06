/*============================================================================
Simple Browser Detection Script
Author: Michael J. Ryan (http://tracker1.info)

Public Domain

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
------------------------------------------------------------------------------

Browser matching for various browser.

	browser.ie
	browser.gecko
		browser.firefox
	browser.khtml
		browser.webkit
			browser.chrome
			browser.safari
	browser.opera

recommended:
	use browser.gecko over browser.firefox
	use browser.webkit over browser.chrome or browser.safari

============================================================================*/
//console.debug("begin browser.js");
(function(b){
	b.any = !!(navigator && navigator.userAgent);
	if (!b.any) return;

	//browsermatch method...
	function bm(re) {
		var m = navigator.userAgent.match(re);
		return (m && m[1]);
	}

	//setup browser detection
	b.gecko = +bm(/Gecko\/([.0-9]*)/) || null;
	b.ff = +bm(/Firefox\/([.0-9]*)/) || null;
	b.khtml = +(!!bm(/\((KHTML)/)) || null;
	b.webkit = +(bm(/AppleWebKit\/([.0-9]*)/));
	b.chrome = +(b.webkit && bm(/Chrome\/([.0-9]*)/)) || null;
	b.safari = +(b.webkit && bm(/Safari\/([.0-9]*)/) && bm(/Version\/([.0-9]*)/)) || null;
	b.opera = +(bm(/Opera\/([.0-9]*)/) && bm(/Version\/([.0-9]*)/) || bm(/Opera\/([.0-9]*)/)) || null;
	b.trident = +(bm(/Trident\/([.0-9]+)/)) || null
	b.ie =  (function(){ //http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
		var v = 4, div = document.createElement('div');
		while (div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',div.getElementsByTagName('i')[0]);
		return v > 5 ? v : null;
	}());
	b.trident = parseFloat(bm(/Trident\/([.0-9]*)/)) || null;

	//mobile detection - thanks to http://detectmobilebrowsers.com/
	b.mobile = (function(a){return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))}(navigator.userAgent||navigator.vendor||window.opera)) || null;

	//enhanced (greater than or equal to 800x600 space
	b.enhanced = (screen.height >= 600 && screen.width >= 800 && 1) || null;

	//check for specific mobile version paths
	if (b.mobile) {
		b.ios = parseInt(bm(/iOS\s*\d+(|\.\d+)/)) || null;
		b.iphone = bm(/(iPhone)/) && 1 || null;
		b.ipad = bm(/(iPad)/) && 1 || null;
		b.ipod = bm(/(iPod)/ && 1) || null;

		b.android = parseInt(bm(/Android\s*\d+(|\.\d+)/)) || null;
		if (b.android && b.android < 3) {
			//android 1.x-2.x - presume phone (some false positives for older tablets)
			b.aphone = 1;
		} else if (b.android && b.android < 4) {
			//android 3.x - presume tablet - (some false positives for custom flashed phones)
			b.atablet = 1;
		} else if (b.android) {
			//android 4+ (chrome target, detect, not sure about Firefox/Dolphin,Opera detection)
			b.aphone = b.android && bm(/\b(Mobile)\b/) && 1 || null;
			b.atablet = +(b.android && !b.aphone) || null;
		}

		b.iemobile = parseFloat(bm(/IEMobile\/([.0-9]+)/)) || null;
		b.phone = +(p.iphone || p.ipod || b.iemobile || b.aphone) || null;
		b.tablet = +(!b.phone) || null;
	}

	b.desktop = (!b.mobile && b.enhanced) || null;
	b.reduced = (!b.mobile && !b.desktop && 1) || null;

	//delete empty values
	for (var x in b) {
		if (b[x] === null)
			delete b[x];
	}

	//disable IE matching for older Opera versions.
	if (b.opera && b.ie) delete b.ie;

	return b;
}(this.browser = this.browser || {}));
//console.debug("end browser.js");