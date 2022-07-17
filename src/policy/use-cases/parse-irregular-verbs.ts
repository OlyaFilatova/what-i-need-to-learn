export class ParseIrregularVerbs {
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

    getAllIrregularVerbsString() {
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