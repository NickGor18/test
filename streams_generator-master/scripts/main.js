let streamsCounter = 0;
let numberOfStreams = document.getElementById(`numberOfStreams`);
let streams = document.getElementById(`streams`);
let start = document.getElementById(`start`);
let rangesCounter = [];

// Other Functions

function createP(target, text) {
    let p = document.createTextNode(text);
    target.append(p);
}

function createDiv(target, id, className = `empty`) {
    let div = document.createElement(`div`);
    div.id = id;
    div.className = className;
    target.append(div);
    return div;
}

function createInput(target, id, type, className = `empty`, value = null) {
    let input = document.createElement(`input`);
    input.id = id;
    input.value = value;
    input.type = type;
    input.className = className;
    target.append(input);
    return input;
}

function createLabel(target, text, className = `empty`) {
    let label = document.createElement(`label`);
    label.className = className;
    target.append(label);
    label.innerHTML = text;
    return label;
}

function createSelect(target, id, className = `empty`) {
    let select = document.createElement(`select`);
    select.id = id;
    select.className = className;
    target.append(select);
    return select;
}

function createOption(target, value, text, isSelected = 0) {
    let option = document.createElement(`option`);
    option.value = value;
    option.text = text;
    option.selected = isSelected;
    target.append(option);
}

function createPre(target, text) {
    let pre = document.createElement(`pre`);
    target.append(pre);
    pre.innerHTML = text;
}

function createString(text, level) {
    let data = ``;
    for (let i = 0; i < level; i++) {
        data += `\t`;
    }
    data += text + `\n`;
    return data;
}

function createEmptyNodeOpenClose(nodeName, level) {
    let node = `\n`;
    let open = `&lt;${nodeName}&gt;\n`;
    let close = `&lt;/${nodeName}&gt;`;
    for (let i = 0; i < level; i++) {
        node += `\t`;
    }
    node += open;
    node += `-\n`;
    for (let i = 0; i < level; i++) {
        node += `\t`;
    }
    node += close;
    return node;
}

function createFilledNodeOpenClose(nodeName, filler, level) {
    let node = `\n`;
    for (let i = 0; i < level; i++) {
        node += `\t`;
    }
    return `${node}&lt;${nodeName}&gt;${filler}&lt;/${nodeName}&gt;`;
}

function createStreamElement(elementId) {
    let stream = createDiv(streams, `stream-${elementId}`, `stream`);

    createP(stream, `Id`);
    createInput(stream, `streamId-${elementId}`, `number`, `box`, elementId + 1);
    createP(stream, `Name`);
    createInput(stream, `streamName-${elementId}`, `text`);

    //Select datatype
    createP(stream, `Datatype`);
    let datatype = createSelect(stream, `streamDatatype-${elementId}`, `box`);
    createOption(datatype, ``, `Empty`, 1);
    createOption(datatype, `PERCENT`, `%`);

    //Select units
    createP(stream, `Units`);
    let units = createSelect(stream, `streamUnits-${elementId}`, `box`);
    createOption(units, ``, `Empty`, 1);
    createOption(units, `%`, `%`);

    // Yline
    let label = createLabel(stream, `Yline`, `box`);
    let yline = createInput(label, `ylineCheck-${elementId}`, `checkbox`);
    yline.addEventListener(`click`, ylineCheck);

    // Ranges
    createP(stream, `Ranges`);
    let rangeCount = createInput(stream, `ranges-${elementId}`, `number`, 0);
    rangeCount.addEventListener(`input`, rangeFieldEvent);

    // Boxes
    createDiv(stream, `ylineBox-${elementId}`, `box`);
    createDiv(stream, `rangesDiv-${elementId}`, `ranges`);


    // Views
    let views = createDiv(stream, `streamViews-${elementId}`);

    label = createLabel(views, `Current`);
    let current = createInput(label, `viewCurrent-${elementId}`, `checkbox`);
    //current.style.display = `block`
    current.addEventListener(`click`, viewsBoxChecked);
    
    label = createLabel(views, `History`);
    let history = createInput(label, `viewHistory-${elementId}`, `checkbox`);
    //history.style.display = `block`
    history.addEventListener(`click`, viewsBoxChecked);
}

function createView(type, id) {
    let label;
    target = document.getElementById(`streamViews-${id}`);
    if (type == `viewCurrent`) {
        currentView = createDiv(target, `currentView-${id}`, `box`);

        label = createLabel(currentView, `Plate`, `box`);
        let plateChart = createInput(label, `plateChart-${id}`, `checkbox`);

        label = createLabel(currentView, `Gauge`, `box`);
        let gaugeChart = createInput(label, `gaugeChart-${id}`, `checkbox`);

        createDiv(currentView, `divCurrentViews-${id}`, `box`);
    }

    if (type == `viewHistory`) {
        historyView = createDiv(target, `historyView-${id}`, `box`);

        label = createLabel(historyView, `Event`, `box`);
        let eventChart = createInput(label, `eventChart-${id}`, `checkbox`);

        label = createLabel(historyView, `Stepped`, `box`);
        let steppedChart = createInput(label, `steppedChart-${id}`, `checkbox`);

        label = createLabel(historyView, `Spline`, `box`);
        let splineChart = createInput(label, `splineChart-${id}`, `checkbox`);

        label = createLabel(historyView, `Zigzag`, `box`);
        let zigzagChart = createInput(label, `zigzagChart-${id}`, `checkbox`);

        label = createLabel(historyView, `Bar`, `box`);
        let barChart = createInput(label, `barChart-${id}`, `checkbox`);

        label = createLabel(historyView, `Dots`, `box`);
        let dotsChart = createInput(label, `dotsChart-${id}`, `checkbox`);

        createP(historyView, `Min`);
        createInput(historyView, `historyMinValue-${id}`, `number`, `box`, -1);

        createP(historyView, `Max`);
        createInput(historyView, `historyMaxValue-${id}`, `number`, `box`, 101);

        createDiv(historyView, `divHistoryViews-${id}`, `box`);
    }
}

function deleteView(type, id) {
    streamViews = document.getElementById(`streamViews-${id}`);
    if (type == `viewCurrent`) streamViews.removeChild(document.getElementById(`currentView-${id}`));
    if (type == `viewHistory`) streamViews.removeChild(document.getElementById(`historyView-${id}`));
}

function createRangesBox(streamId, id) {
    console.log(streamId, id);
    let target = document.getElementById(`rangesDiv-${streamId}`);
    let range = createDiv(target, `range-${streamId}-${id}`, `box`);
    createP(range, `Condition`);
    let select = createSelect(range, `rangeCondition-${streamId}-${id}`);
    createOption(select, `=`, `=`, 1);
    createOption(select, `&lt;`, `<`, 0);
    createOption(select, `&gt;`, `>`, 0);
    createOption(select, `&lt;=`, `<=`, 0);
    createOption(select, `&gt;=`, `>=`, 0);
    createOption(select, `!=`, `!=`, 0);
    createP(range, `Value`);
    createInput(range, `conditionValue-${streamId}-${id}`, `number`, `box`, 0);
    createP(range, `Color`);
    let color = createInput(range, `conditionColor-${streamId}-${id}`, `text`, `box`, `#FF0000`);
    createP(range, `Text`);
    createInput(range, `conditionText-${streamId}-${id}`, `text`, `box`, `Down`);
}

function createYlineField(id) {
    let target = document.getElementById(`ylineBox-${id}`);
    let ylineBox = createDiv(target, `yline-${id}`, `box`);
    createP(ylineBox, `Value`);
    createInput(ylineBox, `ylineValue-${id}`, `number`, `box`, 100);
    createP(ylineBox, `Color`);
    let color = createInput(ylineBox, `ylineColor-${id}`, `text`, `box`, `#FF0000`);
    createP(ylineBox, `Text`);
    createInput(ylineBox, `ylineText-${id}`, `text`, `Box`, `alert`);
}

    class infCollector{
    collectInformation() {
        let streams = [];
        for (let i = 0; i < streamsCounter; i++){
            let stream = {};
            const id = document.getElementById(`streamId-${i}`);
            stream[`id`] = id.value;
            const name = document.getElementById(`streamName-${i}`);
            stream[`name`] = name.value;
            const datatype = document.getElementById(`streamDatatype-${i}`);
            stream[`datatype`] = datatype.value;
            const units = document.getElementById(`streamUnits-${i}`);
            stream[`units`] = units.value;
            const isYline = document.getElementById(`ylineCheck-${i}`);
            stream[`isYline`] = isYline.checked;
            if (isYline.checked) {
                stream[`yline`] = {};
                const ylineValue = document.getElementById(`ylineValue-${i}`);
                stream[`yline`][`ylineValue`] = ylineValue.value;
                const ylineColor = document.getElementById(`ylineColor-${i}`);
                stream[`yline`][`ylineColor`] = ylineColor.value;
                const ylineText = document.getElementById(`ylineText-${i}`);
                stream[`yline`][`ylineText`] = ylineText.value;
            }
            const ranges = document.getElementById(`ranges-${i}`);
            if (ranges.value) {
                stream[`rangesNumber`] = ranges.value;
                stream[`ranges`] = [];
                for (let j = 0; j < ranges.value; j++) {
                    let range = {};
    
                    const rangeCondition = document.getElementById(`rangeCondition-${i}-${j}`);
                    range[`rangeCondition`] = rangeCondition.value;
    
                    const conditionValue = document.getElementById(`conditionValue-${i}-${j}`);
                    range[`conditionValue`] = conditionValue.value;
                    
                    const conditionColor = document.getElementById(`conditionColor-${i}-${j}`);
                    range[`conditionColor`] = conditionColor.value;
    
                    const conditionText = document.getElementById(`conditionText-${i}-${j}`);
                    range[`conditionText`] = conditionText.value;
    
                    stream[`ranges`].push(range)
                }
            }
            else {
                stream[`rangesNumber`] = 0;
            }
            const viewCurent = document.getElementById(`viewCurrent-${i}`);
            stream[`isViewCurrent`] = viewCurent.checked;
            if (viewCurent.checked) {
                stream[`currentViews`] = {};
    
                const plateChart = document.getElementById(`plateChart-${i}`);
                stream[`currentViews`][`plateChart`] = plateChart.checked;
    
                const gaugeChart = document.getElementById(`gaugeChart-${i}`);
                stream[`currentViews`][`gaugeChart`] = gaugeChart.checked;
            }
            const viewHistory = document.getElementById(`viewHistory-${i}`);
            stream[`isViewHistory`] = viewHistory.checked;
            if (viewHistory.checked) {
                stream[`historyViews`] = {};
    
                const eventChart = document.getElementById(`eventChart-${i}`);
                stream[`historyViews`][`eventChart`] = eventChart.checked;
    
                const steppedChart = document.getElementById(`steppedChart-${i}`);
                stream[`historyViews`][`steppedChart`] = steppedChart.checked;
    
                const splineChart = document.getElementById(`splineChart-${i}`);
                stream[`historyViews`][`splineChart`] = splineChart.checked;
    
                const zigzagChart = document.getElementById(`zigzagChart-${i}`);
                stream[`historyViews`][`zigzagChart`] = zigzagChart.checked;
    
                const barChart = document.getElementById(`barChart-${i}`);
                stream[`historyViews`][`barChart`] = barChart.checked;
    
                const dotsChart = document.getElementById(`dotsChart-${i}`);
                stream[`historyViews`][`dotsChart`] = dotsChart.checked;
    
                const historyMin = document.getElementById(`historyMinValue-${i}`);
                stream[`historyMin`] = historyMin.value;
    
                const historyMax = document.getElementById(`historyMaxValue-${i}`);
                stream[`historyMax`] = historyMax.value;
            }
    
            streams.push(stream);
        }
        return streams;
    }
    constructor(){
        this.info = this.collectInformation();
        return this.info;
    }
}
    class xmlCreator{
    constructor(inf) {
        let xml = ``;
        let tmp;
        let splitted = [];
        tmp = createEmptyNodeOpenClose(`streams`, 1);
        splitted = tmp.split(`-`);
        
        xml += splitted[0];
        for(let streamNumber = 0; streamNumber < streamsCounter; streamNumber++) {
            let stream = inf[streamNumber];
            let splittedStream = [];
    
            tmp = createEmptyNodeOpenClose(`stream`, 2);
            splittedStream = tmp.split(`-`);
            xml += splittedStream[0];
    
            xml += createFilledNodeOpenClose(`id`, stream.id, 3);
            xml += createFilledNodeOpenClose(`name`, stream.name, 3);
            xml += createFilledNodeOpenClose(`datatype`, stream.datatype, 3);
            xml += createFilledNodeOpenClose(`units`, stream.units, 3);
    
            let splittedView = [];
            tmp = createEmptyNodeOpenClose(`views`, 3);
            splittedView = tmp.split(`-`);
            xml += splittedView[0];
    
            let ranges = false;
            if (stream.rangesNumber) ranges = this.buildRanges(stream.ranges);
            
            let hisoryMinMax = false;
            if (stream.historyMin || stream.historyMax) {
                hisoryMinMax = this.buildMinMax(stream.historyMin, stream.historyMax);
            }
    
            let yline = false;
            if (stream.isYline) yline = this.buildYline(stream.yline);
    
            if (stream.isViewCurrent) {
                tmp = createEmptyNodeOpenClose(`current`, 4);
                let splittedCurrent = tmp.split(`-`);
                xml += splittedCurrent[0];
                let i = 0;
    
                for (let view in stream.currentViews) {
                    if (stream.currentViews[view]) {
                        xml += this.createChart(`c${(streamNumber + 1)}-${i + 1}` , view, ranges, false, false);
                        i++;
                    } 
                }
                xml += splittedCurrent[1];
            }
            if (stream.isViewHistory) {
                tmp = createEmptyNodeOpenClose(`history`, 4);
                let splittedHistory = tmp.split(`-`);
                xml += splittedHistory[0];
                let i = 0;
    
                for (let view in stream.historyViews) {
                    if (stream.historyViews[view]) {
                        xml += this.createChart(`h${(streamNumber + 1)}-${i + 1}`, view, ranges, hisoryMinMax, yline);
                        i++;
                    } 
                }
                xml += splittedHistory[1];
            }
    
            xml += splittedView[1] + splittedStream[1];
        }
        xml += splitted[1];
    
        while (xml.search(`\n\n`) > -1) {
            xml = xml.replace(`\n\n`, `\n`)
        }
    
        this.xml = xml;
        if (document.getElementById(`xml-info`)) {
            document.getElementById(`xml`).removeChild(document.getElementById(`xml-info`))
        }
        createPre(createDiv(document.getElementById(`xml`), `xml-info`, `code`), this.xml);
    }
    
     createChart(id, name, ranges, minMax, yline) {
        let chart = ``;
        const typesToNames = {
            plateChart: `Plate Info`,
            gaugeChart: `Gauge`,
            eventChart: `Event Chart`,
            steppedChart: `Stepped Chart`,
            splineChart: `Spline Chart`,
            zigzagChart: `Zigzag Chart`,
            barChart: `Bars Chart`,
            dotsChart: `Dots Chart`
        };
    
        const typesToType = {
            plateChart: `plate`,
            gaugeChart: `gauge`,
            eventChart: `events`,
            steppedChart: `stepped`,
            splineChart: `spline`,
            zigzagChart: `zigzag`,
            barChart: `bar`,
            dotsChart: `dots_dynamic_size`
        };
    
        let tmp = createEmptyNodeOpenClose(`chart`, 5);
        let splittedtmp = tmp.split(`-`);
        chart += splittedtmp[0];
    
        chart += createFilledNodeOpenClose(`id`, id, 6);
        chart += createFilledNodeOpenClose(`name`, typesToNames[name], 6);
        chart += createFilledNodeOpenClose(`type`, this.buildType(typesToType[name], ranges, minMax, yline), 6);
    
        chart += splittedtmp[1];
        return chart;
    }
    
     buildType(type, ranges, minMax, yline) {
        let builtType = `&lt;![CDATA[`;
        builtType += type;
        if (ranges) builtType += `.${ranges}`;
        if (yline) builtType += `.${yline}`;
        if (minMax) builtType += `.${minMax}`;
        builtType += `]]&gt;`;
        return builtType;
    }
    
     buildYline(yline) {return `yline(${yline.ylineValue}:${yline.ylineColor}:${yline.ylineText})`}
    
     buildMinMax(min, max) {
        if (min && max) return `min(${min}.max(${max})`;
        if (min) return `min(${min})`;
        if (max) return `max(${max})`;
    }
    
    buildRanges(ranges) {
        let rangesString = ``;
        ranges = ranges.sort(function(a, b) {
            if (Number(a.conditionValue) > Number(b.conditionValue)) return 1;
            if (Number(a.conditionValue) < Number(b.conditionValue)) return -1;
            return 0;
        });
        rangesString += `ranges(`;
        for (let i = 0; i < ranges.length; i++) {
            let range = ranges[i];
            console.log(range);
            rangesString += range.rangeCondition;
            rangesString += Number(range.conditionValue);
            if (range.conditionColor) {
                rangesString += `:${range.conditionColor}`;
            }
            if (range.conditionText) {
                rangesString += `:${range.conditionText}`;
            }
            rangesString += `;`;
        }
        rangesString += `)`;
        return rangesString;
    }
}   
    // Event s
    function newNumberOfStreams(e) {
        if (streamsCounter < e.target.value) {
            for (streamsCounter; streamsCounter < e.target.value; streamsCounter++) {
                rangesCounter.push(0);
                createStreamElement(streamsCounter);
            }
        }
        else {
            for(streamsCounter; streamsCounter > e.target.value; streamsCounter--) {
                rangesCounter.pop();
                streams.removeChild(document.getElementById(`stream-${(streamsCounter - 1)}`));
            }
        }
    }
    
    function viewsBoxChecked(event) {
        let info = event.target.id.split(`-`);
        let type = info[0];
        let id = info[1];
        if (event.target.checked) createView(type, id);
        else deleteView(type, id); 
    }
    
    function rangeFieldEvent(event) {
        let id = event.target.id.split(`-`)[1];
        let value = event.target.value;
        if (rangesCounter[id] < value) {
            for(rangesCounter[id]; rangesCounter[id] < value; rangesCounter[id]++) {
                createRangesBox(id, rangesCounter[id]);
            }
        }
        else {
            for(rangesCounter[id]; rangesCounter[id] > value; rangesCounter[id]--) {
                document.getElementById(`rangesDiv-${id}`).removeChild(document.getElementById(`range-${id}-${rangesCounter[id]-1}`));
            }
        }
    }
    
    function ylineCheck(event) {
        let id = event.target.id.split(`-`)[1];
        if (event.target.checked) createYlineField(id);
        else document.getElementById(`ylineBox-${id}`).removeChild(document.getElementById(`yline-${id}`));
    }
    
    function build(event) {
        if (streamsCounter === 0) console.log(`nothing to do`);
        else new xmlCreator(new infCollector());
    }
    function erase(event) {
        if (document.getElementById(`xml-info`)) {
            document.getElementById(`xml`).removeChild(document.getElementById(`xml-info`))
        }
        createPre(createDiv(document.getElementById(`xml`), `xml-info`, `code`), ``);
    }
    start.addEventListener(`click`, build);
    document.getElementById(`erase`).addEventListener(`click`, erase);
    numberOfStreams.oninput = newNumberOfStreams;