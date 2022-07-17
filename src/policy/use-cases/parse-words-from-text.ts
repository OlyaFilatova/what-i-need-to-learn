import { WordCount } from '../entities/word-count';
import { Word } from '../entities/word';
import { ParseResult } from '../entities/parse-result';

export class ParseWordsFromText {
    allIrregularVerbs = [
        [['awake'], ['awoke', 'awoken']],
        [['be'], ['am', 'is', 'are', 'was', 'were', 'been']],
        [['beat'], ['beat']],
        [['become'], ['became', 'become']],
        [['begin'], ['began', 'begun']],
        [['bend'], ['bent']],
        [['beset'], ['beset']],
        [['bet'], ['bet']],
        [['bid'], ['bid', 'bade', 'bidden']],
        [['bind'], ['bound']],
        [['bite'], ['bit', 'bitten']],
        [['bleed'], ['bled']],
        [['blow'], ['blew', 'blown']],
        [['break'], ['broke', 'broken']],
        [['breed'], ['bred']],
        [['bring'], ['brought']],
        [['broadcast'], ['broadcast']],
        [['build'], ['built']],
        [['burn'], ['burned', 'burnt']],
        [['burst'], ['burst']],
        [['buy'], ['bought']],
        [['cast'], ['cast']],
        [['catch'], ['caught']],
        [['choose'], ['chose', 'chosen']],
        [['cling'], ['clung']],
        [['come'], ['came', 'come']],
        [['cost'], ['cost']],
        [['creep'], ['crept']],
        [['cut'], ['cut']],
        [['deal'], ['dealt']],
        [['dig'], ['dug']],
        [['dive'], ['dived', 'dove']],
        [['do'], ['did', 'done']],
        [['draw'], ['drew', 'drawn']],
        [['dream'], ['dreamed', 'dreamt']],
        [['drink'], ['drank', 'drunk']],
        [['drive'], ['drove', 'driven']],
        [['eat'], ['ate', 'eaten']],
        [['fall'], ['fell', 'fallen']],
        [['feed'], ['fed']],
        [['feel'], ['felt']],
        [['fight'], ['fought']],
        [['find'], ['found']],
        [['fit'], ['fit']],
        [['flee'], ['fled']],
        [['fling'], ['flung']],
        [['fly'], ['flew', 'flown']],
        [['forbid'], ['forbade', 'forbidden']],
        [['forget'], ['forgot', 'forgotten']],
        [
            ['forego', 'forgo'],
            ['forewent', 'foregone'],
        ],
        [['forgive'], ['forgave', 'forgiven']],
        [['forsake'], ['forsook', 'forsaken']],
        [['freeze'], ['froze', 'frozen']],
        [['get'], ['got', 'gotten']],
        [['give'], ['gave', 'given']],
        [['go'], ['went', 'gone']],
        [['grind'], ['ground']],
        [['grow'], ['grew', 'grown']],
        [['hang'], ['hung']],
        [['have'], ['had']],
        [['hear'], ['heard']],
        [['hide'], ['hid', 'hidden']],
        [['hit'], ['hit']],
        [['hold'], ['held']],
        [['hurt'], ['hurt']],
        [['keep'], ['kept']],
        [['kneel'], ['knelt']],
        [['knit'], ['knit']],
        [['know'], ['knew', 'known']],
        [['lay'], ['laid']],
        [['lead'], ['led']],
        [['leap'], ['leaped', 'leapt']],
        [['learn'], ['learned', 'learnt']],
        [['leave'], ['left']],
        [['lend'], ['lent']],
        [['let'], ['let']],
        [['lie'], ['lay', 'lain']],
        [['light'], ['lighted', 'lit']],
        [['lose'], ['lost']],
        [['make'], ['made']],
        [['mean'], ['meant']],
        [['meet'], ['met']],
        [['misspell'], ['misspelled', 'misspelt']],
        [['mistake'], ['mistook', 'mistaken']],
        [['mow'], ['mowed', 'mown']],
        [['overcome'], ['overcame', 'overcome']],
        [['overdo'], ['overdid', 'overdone']],
        [['overtake'], ['overtook', 'overtaken']],
        [['overthrow'], ['overthrew', 'overthrown']],
        [['pay'], ['paid']],
        [['plead'], ['pleaded', 'pled']],
        [['prove'], ['proved', 'proven']],
        [['put'], ['put']],
        [['quit'], ['quit']],
        [['read'], ['read']],
        [['rid'], ['rid']],
        [['ride'], ['rode', 'ridden']],
        [['ring'], ['rang', 'rung']],
        [['rise'], ['rose', 'risen']],
        [['run'], ['ran', 'run']],
        [['saw'], ['sawed', 'sawn']],
        [['say'], ['said']],
        [['see'], ['saw', 'seen']],
        [['seek'], ['sought']],
        [['sell'], ['sold']],
        [['send'], ['sent']],
        [['set'], ['set']],
        [['sew'], ['sewed', 'sewn']],
        [['shake'], ['shook', 'shaken']],
        [['shave'], ['shaved', 'shaven']],
        [['shear'], ['sheared', 'shore', 'shorn']],
        [['shed'], ['shed']],
        [['shine'], ['shone']],
        [['shoe'], ['shod']],
        [['shoot'], ['shot']],
        [['show'], ['showed', 'shown']],
        [['shrink'], ['shrank', 'shrunk']],
        [['shut'], ['shut']],
        [['sing'], ['sang', 'sung']],
        [['sink'], ['sank', 'sunk']],
        [['sit'], ['sat']],
        [['sleep'], ['slept']],
        [['slay'], ['slew', 'slain']],
        [['slide'], ['slid']],
        [['sling'], ['slung']],
        [['slit'], ['slit']],
        [['smite'], ['smote', 'smitten']],
        [['sow'], ['sowed', 'sown']],
        [['speak'], ['spoke', 'spoken']],
        [['speed'], ['sped']],
        [['spend'], ['spent']],
        [['spill'], ['spilled', 'spilt']],
        [['spin'], ['spun']],
        [['spit'], ['spit', 'spat']],
        [['split'], ['split']],
        [['spread'], ['spread']],
        [['spring'], ['sprang', 'sprung']],
        [['stand'], ['stood']],
        [['steal'], ['stole', 'stolen']],
        [['stick'], ['stuck']],
        [['sting'], ['stung']],
        [['stink'], ['stank', 'stunk']],
        [['stride'], ['strode', 'stridden']],
        [['strike'], ['struck']],
        [['string'], ['strung']],
        [['strive'], ['strove', 'striven']],
        [['swear'], ['swore', 'sworn']],
        [['sweep'], ['swept']],
        [['swell'], ['swelled', 'swollen']],
        [['swim'], ['swam', 'swum']],
        [['swing'], ['swung']],
        [['take'], ['took', 'taken']],
        [['teach'], ['taught']],
        [['tear'], ['tore', 'torn']],
        [['tell'], ['told']],
        [['think'], ['thought']],
        [['thrive'], ['thrived', 'throve']],
        [['throw'], ['threw', 'thrown']],
        [['thrust'], ['thrust']],
        [['tread'], ['trod', 'trodden']],
        [['understand'], ['understood']],
        [['uphold'], ['upheld']],
        [['upset'], ['upset']],
        [['wake'], ['woke', 'woken']],
        [['wear'], ['wore', 'worn']],
        [['weave'], ['weaved', 'wove', 'woven']],
        [['wed'], ['wed']],
        [['weep'], ['wept']],
        [['wind'], ['wound']],
        [['win'], ['won']],
        [['withhold'], ['withheld']],
        [['withstand'], ['withstood']],
        [['wring'], ['wrung']],
        [['write'], ['wrote', 'written']],
    ];
    getAallIrregularVerbsString() {
        return (
            'awake | awoke | awoken | ' +
            'be | was | were | been | ' +
            'beat | beat | ' +
            'become | became | become | ' +
            'begin | began | begun | ' +
            'bend | bent | ' +
            'beset | beset | ' +
            'bet | bet | ' +
            'bid | bid | bade | bidden | ' +
            'bind | bound | ' +
            'bite | bit | bitten | ' +
            'bleed | bled | ' +
            'blow | blew | blown | ' +
            'break | broke | broken | ' +
            'breed | bred | ' +
            'bring | brought | ' +
            'broadcast | broadcast | ' +
            'build | built | ' +
            'burn | burned | burnt | ' +
            'burst | burst | ' +
            'buy | bought | ' +
            'cast | cast | ' +
            'catch | caught | ' +
            'choose | chose | chosen | ' +
            'cling | clung | ' +
            'come | came | come | ' +
            'cost | cost | ' +
            'creep | crept | ' +
            'cut | cut | ' +
            'deal | dealt | ' +
            'dig | dug | ' +
            'dive | dived | dove | ' +
            'do | did | done | ' +
            'draw | drew | drawn | ' +
            'dream | dreamed | dreamt | ' +
            'drink | drank | drunk | ' +
            'drive | drove | driven | ' +
            'eat | ate | eaten | ' +
            'fall | fell | fallen | ' +
            'feed | fed | ' +
            'feel | felt | ' +
            'fight | fought | ' +
            'find | found | ' +
            'fit | fit | ' +
            'flee | fled | ' +
            'fling | flung | ' +
            'fly | flew | flown | ' +
            'forbid | forbade | forbidden | ' +
            'forget | forgot | forgotten | ' +
            'forego | forgo | forewent | foregone | ' +
            'forgive | forgave | forgiven | ' +
            'forsake | forsook | forsaken | ' +
            'freeze | froze | frozen | ' +
            'get | got | gotten | ' +
            'give | gave | given | ' +
            'go | went | gone | ' +
            'grind | ground | ' +
            'grow | grew | grown | ' +
            'hang | hung | ' +
            'have | had | ' +
            'hear | heard | ' +
            'hide | hid | hidden | ' +
            'hit | hit | ' +
            'hold | held | ' +
            'hurt | hurt | ' +
            'keep | kept | ' +
            'kneel | knelt | ' +
            'knit | knit | ' +
            'know | knew | known | ' +
            'lay | laid | ' +
            'lead | led | ' +
            'leap | leaped | leapt | ' +
            'learn | learned | learnt | ' +
            'leave | left | ' +
            'lend | lent | ' +
            'let | let | ' +
            'lie | lay | lain | ' +
            'light | lighted | lit | ' +
            'lose | lost | ' +
            'make | made | ' +
            'mean | meant | ' +
            'meet | met | ' +
            'misspell | misspelled | misspelt | ' +
            'mistake | mistook | mistaken | ' +
            'mow | mowed | mown | ' +
            'overcome | overcame | overcome | ' +
            'overdo | overdid | overdone | ' +
            'overtake | overtook | overtaken | ' +
            'overthrow | overthrew | overthrown | ' +
            'pay | paid | ' +
            'plead | pleaded | pled | ' +
            'prove | proved | proven | ' +
            'put | put | ' +
            'quit | quit | ' +
            'read | read | ' +
            'rid | rid | ' +
            'ride | rode | ridden | ' +
            'ring | rang | rung | ' +
            'rise | rose | risen | ' +
            'run | ran | run | ' +
            'saw | sawed | sawn | ' +
            'say | said | ' +
            'see | saw | seen | ' +
            'seek | sought | ' +
            'sell | sold | ' +
            'send | sent | ' +
            'set | set | ' +
            'sew | sewed | sewn | ' +
            'shake | shook | shaken | ' +
            'shave | shaved | shaven | ' +
            'shear | sheared | shore | shorn | ' +
            'shed | shed | ' +
            'shine | shone | ' +
            'shoe | shod | ' +
            'shoot | shot | ' +
            'show | showed | shown | ' +
            'shrink | shrank | shrunk | ' +
            'shut | shut | ' +
            'sing | sang | sung | ' +
            'sink | sank | sunk | ' +
            'sit | sat | ' +
            'sleep | slept | ' +
            'slay | slew | slain | ' +
            'slide | slid | ' +
            'sling | slung | ' +
            'slit | slit | ' +
            'smite | smote | smitten | ' +
            'sow | sowed | sown | ' +
            'speak | spoke | spoken | ' +
            'speed | sped | ' +
            'spend | spent | ' +
            'spill | spilled | spilt | ' +
            'spin | spun | ' +
            'spit | spit | spat | ' +
            'split | split | ' +
            'spread | spread | ' +
            'spring | sprang | sprung | ' +
            'stand | stood | ' +
            'steal | stole | stolen | ' +
            'stick | stuck | ' +
            'sting | stung | ' +
            'stink | stank | stunk | ' +
            'stride | strode | stridden | ' +
            'strike | struck | ' +
            'string | strung | ' +
            'strive | strove | striven | ' +
            'swear | swore | sworn | ' +
            'sweep | swept | ' +
            'swell | swelled | swollen | ' +
            'swim | swam | swum | ' +
            'swing | swung | ' +
            'take | took | taken | ' +
            'teach | taught | ' +
            'tear | tore | torn | ' +
            'tell | told | ' +
            'think | thought | ' +
            'thrive | thrived | throve | ' +
            'throw | threw | thrown | ' +
            'thrust | thrust | ' +
            'tread | trod | trodden | ' +
            'understand | understood | ' +
            'uphold | upheld | ' +
            'upset | upset | ' +
            'wake | woke | woken | ' +
            'wear | wore | worn | ' +
            'weave | weaved | wove | woven | ' +
            'wed | wed | ' +
            'weep | wept | ' +
            'wind | wound | ' +
            'win | won | ' +
            'withhold | withheld | ' +
            'withstand | withstood | ' +
            'wring | wrung | ' +
            'write | wrote | written | '
        );
    }
    protected toSimpleText(text) {
        return text
            .replaceAll('wireMagic', ' ')
            .replaceAll('"pens"', ' ')
            .replaceAll('wsWinStyles', ' ')
            .replaceAll('wpWinPositions', ' ')
            .replaceAll('"events"', ' ')
            .replaceAll('"utf8"', ' ')
            .replaceAll('tStartMs', ' ')
            .replaceAll('dDurationMs', ' ')
            .replaceAll('segs', ' ')
            .replaceAll('\\n', ' ')
            .replaceAll(/([^a-zA-Z \'\-])+/g, ' ')
            .replaceAll(/\' /g, ' ')
            .replaceAll(/ \'/g, ' ')
            .replaceAll(/\- /g, ' ')
            .replaceAll(/ \-/g, ' ');
    }
    private toList(text) {
        let words = text.split(' ');
        words = words.filter((value) => value !== '');
        return words;
    }
    private isWordPresent(word: string, textWords: string[]) {
        const availableEndlins = [
            '',
            "'",
            "'s",
            "'es",
            'eer',
            'er',
            'est',
            'ion',
            'ity',
            'ment',
            'ness',
            'or',
            'sion',
            'ship',
            'th',
            'able',
            'ible',
            'al',
            'ant',
            'ary',
            'ful',
            'ic',
            'ious',
            'ous',
            'ive',
            'less',
            'y',
            'ed',
            'en',
            'ing',
            'ize',
            'ise',
            'ly',
            'ward',
            'wise',
            'uffix',
            'acy',
            'ance',
            'ence',
            'dom',
            'ism',
            'ist',
            'ty',
            'tion',
            'ate',
            'ify',
            'fy',
            'is*',
            'esque',
            'ical',
            'ish',
        ];
        let found = false;
        for (let i = 0; i < availableEndlins.length && !found; i++) {
            const ending = availableEndlins[i];
            let index = textWords.indexOf(word + ending);
            index =
                index !== -1 ? index : textWords.indexOf(word + ending + 's');
            index =
                index !== -1 ? index : textWords.indexOf(word + ending + 'es');

            index =
                index !== -1
                    ? index
                    : textWords.indexOf(word.slice(0, -1) + ending);
            index =
                index !== -1
                    ? index
                    : textWords.indexOf(word.slice(0, -1) + ending + 's');
            index =
                index !== -1
                    ? index
                    : textWords.indexOf(word.slice(0, -1) + ending + 'es');

            index =
                index !== -1
                    ? index
                    : textWords.indexOf(
                          word + word.charAt(word.length - 1) + ending
                      );
            index =
                index !== -1
                    ? index
                    : textWords.indexOf(
                          word + word.charAt(word.length - 1) + ending + 's'
                      );
            index =
                index !== -1
                    ? index
                    : textWords.indexOf(
                          word + word.charAt(word.length - 1) + ending + 'es'
                      );
            found = index !== -1;
        }
        return found;
    }
    private removeAllPresent(word: string, textWords: string[]) {
        const availableEndlins = [
            '',
            "'",
            "'s",
            "'es",
            'eer',
            'er',
            'est',
            'ion',
            'ity',
            'ment',
            'ness',
            'or',
            'sion',
            'ship',
            'th',
            'able',
            'ible',
            'al',
            'ant',
            'ary',
            'ful',
            'ic',
            'ious',
            'ous',
            'ive',
            'less',
            'y',
            'ed',
            'en',
            'ing',
            'ize',
            'ise',
            'ly',
            'ward',
            'wise',
            'uffix',
            'acy',
            'ance',
            'ence',
            'dom',
            'ism',
            'ist',
            'ty',
            'tion',
            'ate',
            'ify',
            'fy',
            'is',
            'esque',
            'ical',
            'ish',
        ];
        let index = -1;
        for (let i = 0; i < availableEndlins.length; i++) {
            const ending = availableEndlins[i];
            do {
                index = textWords.indexOf(word + ending);
                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(word + ending + 's');
                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(word + ending + 'es');

                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(word.slice(0, -1) + ending);
                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(word.slice(0, -1) + ending + 's');
                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(word.slice(0, -1) + ending + 'es');

                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(
                              word + word.charAt(word.length - 1) + ending
                          );
                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(
                              word + word.charAt(word.length - 1) + ending + 's'
                          );
                index =
                    index !== -1
                        ? index
                        : textWords.indexOf(
                              word +
                                  word.charAt(word.length - 1) +
                                  ending +
                                  'es'
                          );

                if (index !== -1) {
                    textWords.splice(index, 1);
                }
            } while (index !== -1);
        }
        return textWords;
    }
    private phrasalVerbs() {
        // const phrasalVerbs = [
        //   'Act on',
        //   'Act out',
        //   'Act up',
        //   'Act up to',
        //   'Act upon',
        //   'Answer back',
        //   'Answer for',
        //   'Answer to',
        //   'Ask after',
        //   'Ask around (round)',
        //   'Ask for',
        //   'Ask in',
        //   'Ask out',
        //   'Ask round',
        //   'Ask over',
        //   'Back down',
        //   'Back into',
        //   'Back off',
        //   'Back onto',
        //   'Back out',
        //   'Back up',
        //   'Be above',
        //   'Be along',
        //   'Be around',
        //   'Be cut out for',
        //   'Be down',
        //   'Be down to',
        //   'Be down on',
        //   'Be down with',
        //   'Be fed up',
        //   'Be in for',
        //   'Be in on',
        //   'Be on about',
        //   'Be on to',
        //   'Be out for',
        //   'Be there for',
        //   'Be snowed under',
        //   'Be taken aback',
        //   'Be taken with',
        //   'Be up for',
        //   'Be up to',
        //   'Be with',
        //   'Beat down',
        //   'Beat off',
        //   'Beat out',
        //   'Beat up',
        //   'Blow away',
        //   'Blow down',
        //   'Blow off',
        //   'Blow out',
        //   'Blow over',
        //   'Blow past',
        //   'Blow up',
        //   'Break away',
        //   'Break down',
        //   'Break even',
        //   'Break in',
        //   'Break off',
        //   'Break into',
        //   'Break out',
        //   'Break through',
        //   'Break up',
        //   'Bring about',
        //   'Bring along',
        //   'Bring around',
        //   'Bring back',
        //   'Bring down',
        //   'Bring forth',
        //   'Bring forward',
        //   'Bring in',
        //   'Bring off',
        //   'Bring out',
        //   'Bring round',
        //   'Bring to',
        //   'Bring up',
        //   'Call away',
        //   'Call down',
        //   'Call for',
        //   'Call in',
        //   'Call off',
        //   'Call on',
        //   'Call out',
        //   'Carry off',
        //   'Carry on',
        //   'Carry out',
        //   'Carry over',
        //   'Check out',
        //   'Check up',
        //   'Check up on',
        //   'Come about',
        //   'Come across',
        //   'Come after',
        //   'Come along',
        //   'Come apart',
        //   'Come around',
        //   'Come at',
        //   'Come away',
        //   'Come back',
        //   'Come before',
        //   'Come between',
        //   'Come by',
        //   'Come down',
        //   'Come down on',
        //   'Come down upon',
        //   'Come down to',
        //   'Come down with',
        //   'Come for',
        //   'Come forth',
        //   'Come from',
        //   'Come in',
        //   'Come in for',
        //   'Come into',
        //   'Come off',
        //   'Come on',
        //   'Come out in',
        //   'Come out of',
        //   'Come out with',
        //   'Come over',
        //   'Come round',
        //   'Come through',
        //   'Come through with',
        //   'Come to',
        //   'Come together',
        //   'Come under',
        //   'Come up',
        //   'Come up to',
        //   'Come up with',
        //   'Come upon',
        //   'Come with',
        //   'Crack down',
        //   'Crack down on',
        //   'Crack on',
        //   'Crack up',
        //   'Crack out',
        //   'Cut back',
        //   'Cut down',
        //   'Cut off',
        //   'Cut out',
        //   'Cut through',
        //   'Cut up',
        //   'Fall about',
        //   'Fall apart',
        //   'Fall away',
        //   'Fall behind',
        //   'Fall down',
        //   'Fall for',
        //   'Fall in',
        //   'Fall in with',
        //   'Fall into',
        //   'Fall off',
        //   'Fall on',
        //   'Fall out',
        //   'Fall through',
        //   'Fall under',
        //   'Fall upon',
        //   'Fill in',
        //   'Fill out',
        //   'Fill up',
        //   'Get about',
        //   'Get across',
        //   'Get after',
        //   'Get ahead',
        //   'Get ahead of',
        //   'Get along',
        //   'Get along with',
        //   'Get around',
        //   'Get around to',
        //   'Get at',
        //   'Get away',
        //   'Get away from',
        //   'Get away with',
        //   'Get back',
        //   'Get back at',
        //   'Get back to',
        //   'Get behind',
        //   'Get behind with',
        //   'Get by',
        //   'Get down',
        //   'Get down on',
        //   'Get down to',
        //   'Get in',
        //   'Get in with',
        //   'Get into',
        //   'Get it',
        //   'Get it on',
        //   'Get it together',
        //   'Get it over with',
        //   'Get it up',
        //   'Get off',
        //   'Get off on',
        //   'Get on',
        //   'Get on to',
        //   'Get on for',
        //   'Get on with',
        //   'Get onto',
        //   'Get out',
        //   'Get out of',
        //   'Get over',
        //   'Get over with',
        //   'Get rid of',
        //   'Get stuck in',
        //   'Get stuck into',
        //   'Get taken in',
        //   'Get through',
        //   'Get through to',
        //   'Get to',
        //   'Get together',
        //   'Get up',
        //   'Get up to',
        //   'Get used',
        //   'Get with',
        //   'Give away',
        //   'Give back',
        //   'Give forth',
        //   'Give in',
        //   'Give in to',
        //   'Give it up for/to',
        //   'Give of oneself',
        //   'Give off',
        //   'Give out',
        //   'Give over',
        //   'Give up',
        //   'Give up on',
        //   'Give way',
        //   'Give way to',
        //   'Give yourself up',
        //   'Go about',
        //   'Go across',
        //   'Go after',
        //   'Go against',
        //   'Go ahead',
        //   'Go ahead with',
        //   'Go all out',
        //   'Go along',
        //   'Go around',
        //   'Go at',
        //   'Go away',
        //   'Go back',
        //   'Go before',
        //   'Go below',
        //   'Go by',
        //   'Go down',
        //   'Go down with',
        //   'Go for',
        //   'Go for it',
        //   'Go forward',
        //   'Go in',
        //   'Go in for',
        //   'Go in with',
        //   'Go into',
        //   'Go off',
        //   'Go off with',
        //   'Go on',
        //   'Go on to',
        //   'Go on about',
        //   'Go on at',
        //   'Go on with',
        //   'Go out',
        //   'Go out for',
        //   'Go out to',
        //   'Go over',
        //   'Go over to',
        //   'Go so far as',
        //   'Go past',
        //   'Go round',
        //   'Go through',
        //   'Go through with',
        //   'Go to',
        //   'Go together',
        //   'Go towards',
        //   'Go under',
        //   'Go up',
        //   'Go up for',
        //   'Go with',
        //   'Go without',
        //   'Hang about',
        //   'Hang on',
        //   'Hang out',
        //   'Hang over',
        //   'Hang together',
        //   'Hang up',
        //   'Hold back',
        //   'Hold down',
        //   'Hold in',
        //   'Hold off',
        //   'Hold on',
        //   'Hold out',
        //   'Hold over',
        //   'Hold up',
        //   'Jump around',
        //   'Jump at',
        //   'Jump down',
        //   'Jump in',
        //   'Jump off',
        //   'Jump on',
        //   'Jump out',
        //   'Jump up',
        //   'Keep across',
        //   'Keep around',
        //   'Keep at',
        //   'Keep away',
        //   'Keep away from',
        //   'Keep back',
        //   'Keep down',
        //   'Keep from',
        //   'Keep in',
        //   'Keep off',
        //   'Keep on',
        //   'Keep out',
        //   'Keep out of',
        //   'Keep to oneself',
        //   'Keep up',
        //   'Keep up with',
        //   'Kick around',
        //   'Kick back',
        //   'Kick down',
        //   'Kick in',
        //   'Kick off',
        //   'Kick out',
        //   'Kick ou',
        //   'Kick up',
        //   'Knock about',
        //   'Knock back',
        //   'Knock down',
        //   'Knock it off',
        //   'Knock off',
        //   'Knock out',
        //   'Knock ou',
        //   'Knock over',
        //   'Knock together',
        //   'Knock up',
        //   'Lay by',
        //   'Lay down',
        //   'Lay low',
        //   'Lay off',
        //   'Lay on',
        //   'Lay out',
        //   'Lay up',
        //   'Live down',
        //   'Live off',
        //   'Live on',
        //   'Live out',
        //   'Live through',
        //   'Live up',
        //   'Let down',
        //   'Let in',
        //   'Let in on',
        //   'Let off',
        //   'Let on',
        //   'Let out',
        //   'Let past',
        //   'Let up',
        //   'Look after',
        //   'Look ahead',
        //   'Look back',
        //   'Look down on',
        //   'Look around',
        //   'Look at',
        //   'Look for',
        //   'Look forward to',
        //   'Look in (on sby)',
        //   'Look into',
        //   'Look on',
        //   'Look on as',
        //   'Look out',
        //   'Look out for',
        //   'Look round',
        //   'Look through',
        //   'Look to',
        //   'Look up',
        //   'Look up to',
        //   'Look upon',
        //   'Look upon as',
        //   'Make after',
        //   'Make away with',
        //   'Make for',
        //   'Make into',
        //   'Make it up to',
        //   'Make of',
        //   'Make off',
        //   'Make off with',
        //   'Make out',
        //   'Make out of',
        //   'Make over',
        //   'Make towards',
        //   'Make up',
        //   'Make up for',
        //   'Make up to',
        //   'Make way',
        //   'Mess about',
        //   'Mess around',
        //   'Mess up',
        //   'Mess with',
        //   'Move forward',
        //   'Move on',
        //   'Move out',
        //   'Move up',
        //   'Pass away',
        //   'Pass by',
        //   'Pass down',
        //   'Pass off',
        //   'Pass on',
        //   'Pass out',
        //   'Pass over',
        //   'Pass round',
        //   'Pass through',
        //   'Pass to',
        //   'Pass up',
        //   'Pick apart',
        //   'Pick at',
        //   'Pick off',
        //   'Pick on',
        //   'Pick out',
        //   'Pick through',
        //   'Pick up',
        //   'Pick up after',
        //   'Pick up on',
        //   'Pick up on:',
        //   'Pick yourself up',
        //   'Play along',
        //   'Play around',
        //   'Play at',
        //   'Play down',
        //   'Play off',
        //   'Play out',
        //   'Play up',
        //   'Pull ahead',
        //   'Pull apart',
        //   'Pull away',
        //   'Pull in',
        //   'Pull off',
        //   'Pull on',
        //   'Pull out',
        //   'Pull over',
        //   'Pull up',
        //   'Put (effort) into',
        //   'Put across',
        //   'Put aside',
        //   'Put asunder',
        //   'Put away',
        //   'Put back',
        //   'Put by',
        //   'Put down',
        //   'Put down as',
        //   'Put down for',
        //   'Put down to',
        //   'Put forward',
        //   'Put in',
        //   'Put in practice',
        //   'Put off',
        //   'Put of',
        //   'Put on',
        //   'Put on:',
        //   'Put oneself across',
        //   'Put out',
        //   'Put ove',
        //   'Put past',
        //   'Put through',
        //   'Put throug',
        //   'Put to',
        //   'Put together',
        //   'Put towards',
        //   'Put up',
        //   'Put up with',
        //   'Run about',
        //   'Run across',
        //   'Run after',
        //   'Run against',
        //   'Run along',
        //   'Run around',
        //   'Run around after',
        //   'Run away',
        //   'Run away with',
        //   'Run back',
        //   'Run by',
        //   'Run down',
        //   'Run for it',
        //   'Run in',
        //   'Run into',
        //   'Run low',
        //   'Run off',
        //   'Run off with',
        //   'Run on',
        //   'Run out',
        //   'Run ou',
        //   'Run out on',
        //   'Run over',
        //   'Run past',
        //   'Run through',
        //   'Run to',
        //   'Run up',
        //   'Run up against',
        //   'Run up on',
        //   'Run with',
        //   'See in',
        //   'See into',
        //   'See out',
        //   'See through',
        //   'See to',
        //   'Send away',
        //   'Send away for',
        //   'Send back',
        //   'Send down',
        //   'Send off:',
        //   'Send out for',
        //   'Send up',
        //   'Set about',
        //   'Set aside',
        //   'Set back',
        //   'Set down',
        //   'Set forth',
        //   'Set in',
        //   'Set off',
        //   'Set on',
        //   'Set out',
        //   'Set up',
        //   'Set upon',
        //   'Speak for',
        //   'Speak for oneself',
        //   'Speak of',
        //   'Speak out',
        //   'Speak to',
        //   'Speak up',
        //   'Stand aside',
        //   'Stand back',
        //   'Stand by',
        //   'Stand for',
        //   'Stand in for',
        //   'Stand off',
        //   'Stand out',
        //   'Stand',
        //   'out',
        //   'Stand up',
        //   'Stand up for',
        //   'Stand up to',
        //   'Take aback',
        //   'Take after',
        //   'Take against',
        //   'Take apart',
        //   'Take aside',
        //   'Take away',
        //   'Take away from',
        //   'Take back',
        //   'Take down',
        //   'Take for',
        //   'Take in',
        //   'Take it away',
        //   'Take it out in',
        //   'Take it out on',
        //   'Take it upon oneself',
        //   'Take off',
        //   'Take on',
        //   'Take out',
        //   'Take over',
        //   'Take pity',
        //   'Take through',
        //   'Take to',
        //   'Take up',
        //   'Take up with',
        //   'Take upon oneself',
        //   'Throw away',
        //   'Throw down',
        //   'Throw in',
        //   'Throw off',
        //   'Throw on',
        //   'Throw out',
        //   'Throw up',
        //   'Turn against',
        //   'Turn around',
        //   'Turn back',
        //   'Turn down',
        //   'Turn in',
        //   'Turn into',
        //   'Turn off',
        //   'Turn on',
        //   'Turn out',
        //   'Turn over',
        //   'Turn over:',
        //   'Turn round',
        //   'Turn to',
        //   'Turn up',
        //   'Turn upside down',
        //   'Walk away',
        //   'Walk away from',
        //   'Walk in on',
        //   'Walk into',
        //   'Walk it off',
        //   'Walk out',
        //   'Wash away',
        //   'Wash down',
        //   'Wash off',
        //   'Wash out',
        //   'Wash over',
        //   'Wash up',
        //   'Work on',
        //   'Work out',
        //   'Work over',
        //   'Work sb out',
        //   'Work smt off',
        //   'Work sth out',
        //   'Work through',
        //   'Work up',
        //   'Try back',
        //   'Try for',
        //   'Try it on',
        //   'Try on',
        //   'Try out',
        //   'Think about/of',
        //   'Think ahead',
        //   'Think over',
        //   'Think through',
        //   'Think up',
        //   'Spring back',
        //   'Spring on',
        //   'Spring from/ Spring up',
        //   'Spring for',
        //   'Account for',
        //   'Account to',
        //   'Admire to',
        //   'Adopt out',
        //   'Age out',
        //   'Aim at',
        //   'Aim at/to',
        //   'Allow for',
        //   'Attend to',
        //   'Bail out',
        //   'Ball out',
        //   'Ball up',
        //   'Balls up',
        //   'Bear on',
        //   'Bear out',
        //   'Bear upon',
        //   'Bear with',
        //   'Believe in',
        //   'Block off',
        //   'Block out',
        //   'Boil down',
        //   'Boil off',
        //   'Boil over',
        //   'Boil up',
        //   'Book in',
        //   'Bottom out',
        //   'Branch out',
        //   'Brighten up',
        //   'Bubble over',
        //   'Buck up',
        //   'Buckle down',
        //   'Buckle up',
        //   'Build up',
        //   'Bump into',
        //   'Burn down',
        //   'Burn out',
        //   'Burn up',
        //   'Calm down',
        //   'Cancel out',
        //   'Catch on',
        //   'Catch up',
        //   'Cheer up',
        //   'Chew out',
        //   'Chew up',
        //   'Chicken out',
        //   'Chill out',
        //   'Clean out',
        //   'Clean up',
        //   'Clear away',
        //   'Clear out',
        //   'Close down',
        //   'Close in on',
        //   'Close off',
        //   'Close up',
        //   'Clock in',
        //   'Clock off',
        //   'Clock out',
        //   'Clock ou',
        //   'Consist in',
        //   'Consist of',
        //   'Cool down',
        //   'Count down',
        //   'Count in',
        //   'Count off',
        //   'Count on',
        //   'Count out',
        //   'Count up',
        //   'Crop out',
        //   'Cross off',
        //   'Cross out',
        //   'Cross over',
        //   'Cry off',
        //   'Cry out for',
        //   'Deal with',
        //   'Do for',
        //   'Do in',
        //   'Do up',
        //   'Do without',
        //   'Draw in',
        //   'Draw on',
        //   'Draw out',
        //   'Draw up',
        //   'Drink in',
        //   'Drink to',
        //   'Drink up',
        //   'Drive at',
        //   'Drive away',
        //   'Dry out',
        //   'Dry up',
        //   'Eat away',
        //   'Eat into',
        //   'Eat out',
        //   'Eat up',
        //   'Find out',
        //   'Finish off',
        //   'Finish up',
        //   'Finish with',
        //   'Fit in',
        //   'Fit into',
        //   'Fit up',
        //   'Fix up',
        //   'Force out',
        //   'Gear up',
        //   'Grow up',
        //   'Hand in',
        //   'Hand off',
        //   'Hand over',
        //   'Hand round',
        //   'Hash out',
        //   'Head off',
        //   'Knuckle down',
        //   'Lead in',
        //   'Lead off',
        //   'Lean on',
        //   'Leave behind',
        //   'Leave off',
        //   'Leave out',
        //   'Lie around',
        //   'Lie before',
        //   'Lie down',
        //   'Lie in',
        //   'Lie low',
        //   'Lift up',
        //   'Light up',
        //   'Lighten up',
        //   'Liven up',
        //   'Lock in',
        //   'Lock out',
        //   'Log in',
        //   'Log on',
        //   'Log out',
        //   'Luck out',
        //   'Meet up',
        //   'Miss out',
        //   'Mix up',
        //   'Monkey around',
        //   'Narrow down',
        //   'Open up',
        //   'Pack away',
        //   'Pack off',
        //   'Pack out',
        //   'Pack up',
        //   'Pay back',
        //   'Pay for',
        //   'Pay off',
        //   'Phase in',
        //   'Phase out',
        //   'Plan on',
        //   'Plough back',
        //   'Plough through',
        //   'Point out',
        //   'Pour out',
        //   'Press out',
        //   'Quiet down',
        //   'Read in',
        //   'Read off',
        //   'Read out',
        //   'Rely on',
        //   'Roll around',
        //   'Roll in',
        //   'Roll out',
        //   'Roll over',
        //   'Roll up',
        //   'Round out',
        //   'Rule in',
        //   'Rule out',
        //   'Rush off',
        //   'Scale back',
        //   'Scare off',
        //   'Scarf down',
        //   'Sell down',
        //   'Sell out',
        //   'Settle down',
        //   'Settle for',
        //   'Settle in',
        //   'Settle on',
        //   'Shake off',
        //   'Shake up',
        //   'Shade up',
        //   'Show in',
        //   'Show off',
        //   'Show up',
        //   'Shower with',
        //   'Shut down',
        //   'Shut in',
        //   'Shut out',
        //   'Shut up',
        //   'Sign off',
        //   'Sign out',
        //   'Sign up',
        //   'Sing along',
        //   'Sink in',
        //   'Sit back',
        //   'Sit down',
        //   'Sit on',
        //   'Sit out',
        //   'Sit through',
        //   'Sit up',
        //   'Skip out',
        //   'Sleep in',
        //   'Sleep on',
        //   'Sleep with',
        //   'Slide off',
        //   'Slow down',
        //   'Smoke out',
        //   'Smooth down',
        //   'Sort out',
        //   'Sound off',
        //   'Speed up',
        //   'Spell out',
        //   'Split up',
        //   'Spread out',
        //   'Sump up',
        //   'Start afresh',
        //   'Start off',
        //   'Start up',
        //   'Stay in',
        //   'Stay on',
        //   'Stay up',
        //   'Step back',
        //   'Step on it',
        //   'Step up',
        //   'Stick around',
        //   'Stick at',
        //   'Stick down',
        //   'Stick it out',
        //   'Stick out',
        //   'Stick to',
        //   'Stick up',
        //   'Stick up for',
        //   'Stick with',
        //   'Talk down',
        //   'Talk into',
        //   'Talk out of',
        //   'Talk over',
        //   'Talk through',
        //   'Think back',
        //   'Tip off',
        //   'Used to',
        //   'Wait for',
        //   'Wait up',
        //   'Wait upon',
        //   'Wake up',
        //   'Warm up',
        //   'Watch out',
        //   'Watch over',
        //   'Wipe away',
        //   'Wipe down',
        //   'Wipe up',
        //   'Write in',
        //   'Write off',
        //   'Write out',
        //   'Yield up',
        //   'Be named after',
        //   'Bring sb up',
        //   'Fall out with sb',
        //   'Get along/on with',
        //   'Grow apart',
        //   'Tell off',
        //   'Put up wi',
        //   'See off',
        //   'Check in',
        //   'Drop off',
        //   'Speed up:',
        //   'Hurry up',
        //   'Look forward',
        //   'Stop over',
        //   'Touch down',
        //   'Call back',
        //   'Call up',
        //   'Pass on (a message)',
        //   'Phone in',
        //   'Bake off',
        //   'Boil away',
        //   'Bolt down',
        //   'Chop up',
        //   'Fry up:',
        //   'Pig out',
        //   'Slice off',
        //   'Whip up',
        //   'Cook away',
        //   'Peel off',
        //   'Thaw out',
        //   'Mix in',
        //   'Bring dow',
        //   'Queue up/line up',
        //   'Ring up',
        //   'Shop around',
        //   'Pop into',
        //   'Wear in',
        //   'Set (someone) back',
        //   'Go with smt',
        //   'Splash out',
        //   'Note down',
        //   'Step down',
        //   'Weigh up (UK)',
        //   'Get on (UK)',
        //   'Drop in',
        //   'Join in',
        //   'Put back (UK)',
        //   'Run out of',
        //   'Level off',
        //   'Dress up',
        //   'Dress down',
        //   'Have on',
        //   'Slip on',
        //   'Wrap up',
        //   'Zip up',
        //   'Duck out',
        //   'Fish for',
        //   'Fish out',
        //   'Horse around',
        //   'Wolf down',
        //   'Beaver away',
        //   'Ferret out',
        //   'Worm out of',
        //   'Rat on',
        //   'Rabbit on (UK)',
        //   'Monkey with',
        //   'Turn turtle',
        //   'Squirrel away',
        //   'Drone on',
        //   'Clam up',
        //   'Ferret around',
        //   'Lark about/around (UK)',
        //   'Leech off',
        //   'Take out of the trash:',
        //   'Clean up/ tidy up',
        //   'Mop up',
        //   'Build on',
        //   'Stock up',
        //   'Put on (music)',
        //   'Drive by',
        //   'Be into',
        //   'Read up on',
        //   'Hand in/turn in',
        //   'Hand out',
        //   'Copy out',
        //   'Drop out',
        //   'Fill in for',
        //   'Slack off',
        //   'Fight off',
        //   'Pass ou',
        //   'Block up',
        //   'Lay (laid) up',
        //   'Swell up',
        //   'Clog up',
        //   'Dose up (UK)',
        //   'Start over',
        //   'Figure out',
        //   'Fork out',
        //   'Rip off',
        //   'Save up',
        //   'Sleep over',
        //   'Sleep through',
        //   'Sleep on it',
        //   'Doze off',
        //   'Talk ove',
        //   'Wrestle with',
        //   'Think throug',
        //   'Run into problems',
        //   'Break out of',
        //   'Stake out',
        //   'Lock up',
        //   'Wipe out',
        //   'Used up',
        //   'Die out',
        // ];
    }
    private grammar() {
        /*
        const grammarArray = [
          'would\'ve',
          'shouldn\'t',
          'oy',
          'eh',
          'ha-ha-ha',
          'why\'d',
          'aah',
          'mm',
          'mm-hmm',
          'duh',
          'that\'d',
          'uh-huh',
          'ah',
          'what\'d',
          'huh',
          'heh',
          'ugh',
          'aw',
          'unh',
          'aww',
          'uh-oh',
          '\'cause',
          'ooh',
          'all',
          'hmm',
          'where\'d',
          'must\'ve',
          'yep',
          'whoa',
          'another',
          'any',
          'anybody',
          'anyone',
          'anything',
          'as',
          'aught',
          'both',
          'each',
          'each other',
          'either',
          'enough',
          'everybody',
          'everyone',
          'everything',
          'few',
          'he',
          'her',
          'hers',
          'herself',
          'him',
          'himself',
          'his',
          'i',
          'idem',
          'it',
          'its',
          'itself',
          'many',
          'me',
          'mine',
          'most',
          'my',
          'myself',
          'naught',
          'neither',
          'no one',
          'nobody',
          'none',
          'nothing',
          'nought',
          'one',
          'one another',
          'other',
          'others',
          'ought',
          'our',
          'ours',
          'ourself',
          'ourselves',
          'several',
          'she',
          'some',
          'somebody',
          'someone',
          'something',
          'somewhat',
          'such',
          'suchlike',
          'that',
          'thee',
          'their',
          'theirs',
          'theirself',
          'theirselves',
          'them',
          'themself',
          'themselves',
          'here',
          'there',
          'these',
          'they',
          'thine',
          'this',
          'those',
          'thou',
          'thy',
          'thyself',
          'us',
          'we',
          'what',
          'whatever',
          'whatnot',
          'whatsoever',
          'whence',
          'where',
          'whereby',
          'wherefrom',
          'wherein',
          'whereinto',
          'whereof',
          'whereon',
          'wherever',
          'wheresoever',
          'whereto',
          'whereunto',
          'wherewith',
          'wherewithal',
          'whether',
          'which',
          'whichever',
          'whichsoever',
          'who',
          'whoever',
          'whom',
          'whomever',
          'whomso',
          'whomsoever',
          'whose',
          'whosever',
          'whosesoever',
          'whoso',
          'whosoever',
          'ye',
          'yon',
          'yonder',
          'you',
          'your',
          'yours',
          'yourself',
          'yourselves',
          'aboard',
          'about',
          'above',
          'across',
          'after',
          'against',
          'along',
          'amid',
          'among',
          'around',
          'as',
          'at',
          'before',
          'behind',
          'below',
          'beneath',
          'beside',
          'between',
          'beyond',
          'but',
          'by',
          'concerning',
          'considering',
          'despite',
          'down',
          'during',
          'except',
          'following',
          'for',
          'from',
          'in',
          'inside',
          'into',
          'like',
          'minus',
          'near',
          'next',
          'of',
          'off',
          'on',
          'onto',
          'opposite',
          'out',
          'outside',
          'over',
          'past',
          'per',
          'plus',
          'regarding',
          'round',
          'save',
          'since',
          'than',
          'through',
          'till',
          'to',
          'toward',
          'under',
          'underneath',
          'unlike',
          'until',
          'up',
          'upon',
          'versus',
          'via',
          'with',
          'within',
          'without',
          'aboard',
          'about',
          'above',
          'across',
          'after',
          'against',
          'ahead of',
          'along',
          'amid',
          'amidst',
          'among',
          'around',
          'as',
          'as far as',
          'as of',
          'aside from',
          'at',
          'athwart',
          'atop',
          'barring',
          'because of',
          'before',
          'behind',
          'below',
          'beneath',
          'beside',
          'besides',
          'between',
          'beyond',
          'but',
          'by',
          'by means of',
          'circa',
          'concerning',
          'despite',
          'down',
          'during',
          'except',
          'except for',
          'excluding',
          'far from',
          'following',
          'for',
          'from',
          'in',
          'in accordance with',
          'in addition to',
          'in case of',
          'in front of',
          'in lieu of',
          'in place of',
          'in spite of',
          'including',
          'inside',
          'instead',
          'like',
          'minus',
          'near',
          'next to',
          'notwithstanding',
          'of',
          'off',
          'on',
          'on account of',
          'on behalf of',
          'on top of',
          'onto',
          'opposite',
          'out',
          'out of',
          'outside',
          'over',
          'past',
          'plus',
          'prior to',
          'regarding',
          'regardless of',
          'save',
          'since',
          'than',
          'through',
          'throughout',
          'till',
          'to',
          'toward',
          'towards',
          'under',
          'underneath',
          'unlike',
          'until',
          'up',
          'upon',
          'versus',
          'via',
          'with',
          'with regard to',
          'within',
          'without',
          'though',
          'although',
          'even though',
          'while',
          'if',
          'else',
          'only if',
          'unless',
          'until',
          'provided that',
          'assuming that',
          'even if',
          'in case',
          'lest',
          'than',
          'rather than',
          'whether',
          'as much as',
          'whereas',
          'after',
          'as long as',
          'as soon as',
          'before',
          'by the time',
          'now that',
          'once',
          'since',
          'till',
          'until',
          'when',
          'whenever',
          'while',
          'because',
          'since',
          'so that',
          'in order',
          'why',
          'that',
          'what',
          'whatever',
          'which',
          'whichever',
          'who',
          'whoever',
          'whom',
          'whomever',
          'whose',
          'how',
          'as though',
          'as if',
          'where',
          'wherever',
          'also',
          'besides',
          'furthermore',
          'likewise',
          'moreover',
          'however',
          'nevertheless',
          'nonetheless',
          'still',
          'conversely',
          'instead',
          'otherwise',
          'rather',
          'accordingly',
          'consequently',
          'hence',
          'meanwhile',
          'then',
          'therefore',
          'thus',
          'and',
          'or',
          'am',
          'be',
          'is',
          'are',
          'aren\'t',
          'were',
          'was',
          'the',
          'have',
          'was',
          'not',
          'i\'m',
          'hadn\'t',
          'don\'t',
          'how',
          'it\'s',
          'can',
          'may',
          'must',
          'shall',
          'will',
          'could',
          'might',
          'should',
          'would',
          'wouldn\'t',
          'you\'re',
          'that\'s',
          'we\'re',
          'gonna',
          'has',
          'what\'s',
          'did',
          'does',
          'do',
          'done',
          'can\'t',
          'had',
          'going',
          'been',
          'let\'s',
          'she\'s',
          'we\'ll',
          'she\'ll',
          'you\'ll',
          'it\'ll',
          'i\'ll',
          'doing',
          'they\'re',
          'hasn\'t',
          'haven\'t',
          'won\'t',
          'there\'s',
          'here\'s',
          'wanna',
          'doesn\'t',
          'we\'ve',
          'didn\'t',
          'i\'ve',
          'you\'ve',
          'they\'ve',
          'should\'ve',
          'anywhere',
          'he\'d',
          'you\'d',
          'who\'d',
          'it\'d',
          'she\'d',
          'they\'d',
          'we\'d',
          'anyone\'s',
          'shh',
          'couldn\'t',
          'they\'ll',
          'wasn\'t',
          'i\'d',
          'we\'d',
          'isn\'t',
          'one\'s',
          'sdh',
          'english',
          'how\'d',
          'um',
          'weren\'t',
          'that\'ll',
          'uh',
          'a',
          'an',
          'oh',
        ];
    */
        /*
      this.allIrregularVerbs.forEach(l => {
        const key = l[0][0];
        let isMet = this.isWordPresent(key, textWords);
        this.removeAllPresent(key, textWords);
        l[1].forEach(word => {
          isMet = isMet ||  this.isWordPresent(word, textWords);
          this.removeAllPresent(word, textWords);
        });
        if (isMet) {
          irregularVerbs.push(key);
        }
      });
    */
    }
    public parse(
        text: string,
        knownWords: string[] = [],
        cleanRootDoubles = false
    ): ParseResult {
        console.log('parsing ...');

        const irregularVerbs = [];
        const res = [];
        text = this.toSimpleText(text).toLowerCase();
        const textWords = this.toList(text);
        console.log('TEXT_WORDS: ', textWords);

        const uniqueWordsRes = this.getUniqueWordsList(
            textWords,
            cleanRootDoubles
        );

        console.log('UNIQUE_WORDS_RES: ', uniqueWordsRes);

        const knownAndUnknownWords = this.separateToKnownAndUnknown(
            uniqueWordsRes,
            knownWords
        );

        return {
            uniqueWordsRes: knownAndUnknownWords.uniqueWordsRes,
            knownWords: knownAndUnknownWords.knownWords,
        };
    }
    removeCommonGrammar(textWords) {
        /*
    const removeCommonGrammar = new RegExp(grammarString, 'g');

    while (removeCommonGrammar.exec(text)) {
      text = text.replace(removeCommonGrammar, ' ');
    }
    */
    }
    removeWordWithEnding(wordCounter, uniqueWords, wordWithEnding) {
        let addCount = 0;
        if (wordCounter.hasOwnProperty(wordWithEnding)) {
            addCount = wordCounter[wordWithEnding];
            delete wordCounter[wordWithEnding];
            // uniqueWords.splice(uniqueWords.indexOf(wordWithEnding), 1);
        }
        return addCount;
    }
    addWordToCounter(wordCounter, uniqueWords, word) {
        if (!wordCounter.hasOwnProperty(word) && word.length > 2) {
            uniqueWords.push(word);
            wordCounter[word] = 0;
        }
    }
    removeRootDoubles(wordCounter, uniqueWords) {
        uniqueWords.forEach((word) => {
            let addCount = 0;

            const immediateEndings = [
                'ism',
                's',
                'ed',
                'er',
                'est',
                'ment',
                'ness',
                'less',
                'ship',
                'able',
                'ing',
                'dom',
                'ize',
                'ise',
                'ish',
            ];
            const removeingOneLetterEndings = [
                'al',
                'ies',
                'ied',
                'ism',
                'ity',
                'ive',
                'tion',
                'sion',
                'y',
            ];

            const possibleCopies = [
                ...immediateEndings.map(
                    (ending) => word.slice(0, word.length - 1) + ending
                ),
                ...immediateEndings.map((ending) => word + ending),
            ];

            const hasIesEnding = word.slice(word.length - 3) === 'ies';
            const hasIedEnding = word.slice(word.length - 3) === 'ied';
            const hasSEnding = word.slice(word.length - 1) === 's';
            const hasEdEnding = word.slice(word.length - 2) === 'ed';

            let alternativeWord;

            if (hasIesEnding) {
                alternativeWord = word.slice(0, word.length - 3) + 'y';
            } else if (hasIedEnding) {
                alternativeWord = word.slice(0, word.length - 3) + 'y';
            }
            for (const ending of immediateEndings) {
                if (word.endsWith(ending)) {
                    alternativeWord = word.slice(
                        0,
                        word.length - ending.length
                    );
                }
            }

            if (alternativeWord == undefined) {
                for (const possible of possibleCopies) {
                    const count = this.removeWordWithEnding(
                        wordCounter,
                        uniqueWords,
                        possible
                    );
                    if (count !== undefined) {
                        addCount += count;
                    }
                }
            } else if (wordCounter.hasOwnProperty(alternativeWord)) {
                const count = this.removeWordWithEnding(
                    wordCounter,
                    uniqueWords,
                    word
                );
                if (count !== undefined) {
                    addCount += count;
                }
                word = alternativeWord;
            }

            wordCounter[word] += addCount;
        });
    }
    getUniqueWordsList(textWords, cleanRootDoubles = false) {
        const uniqueWordsRes = [];
        const uniqueWords = [];
        const wordCounter = {};
        textWords.forEach((word: string) => {
            if (word.length <= 2) {
                return;
            }
            this.addWordToCounter(wordCounter, uniqueWords, word);
            wordCounter[word] += 1;
        });
        if (cleanRootDoubles) {
            this.removeRootDoubles(wordCounter, uniqueWords);
        }
        Object.keys(wordCounter).forEach((word) => {
            const wordCount = new WordCount(new Word(word));
            wordCount.setCount(wordCounter[word]);
            uniqueWordsRes.push(wordCount);
        });
        uniqueWordsRes.sort((wc1: WordCount, wc2: WordCount) => {
            if (wc1.getWord().getText() < wc2.getWord().getText()) {
                return -1;
            }
            if (wc1.getWord().getText() > wc2.getWord().getText()) {
                return 1;
            }
            return 0;
        });
        return uniqueWordsRes;
    }
    separateToKnownAndUnknown(uniqueWordsRes, knownWords) {
        let existingKnownWords = [];
        let unknownWords = [];

        existingKnownWords = uniqueWordsRes.filter(
            (element) => knownWords.indexOf(element.getWord().getText()) !== -1
        );
        unknownWords = uniqueWordsRes.filter(
            (element) => knownWords.indexOf(element.getWord().getText()) === -1
        );
        console.log('existingKnownWords', existingKnownWords);
        console.log('unknownWords', unknownWords);

        return {
            uniqueWordsRes: unknownWords,
            knownWords: existingKnownWords,
        };
    }
}
