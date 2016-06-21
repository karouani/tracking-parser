'use strict';

const tracking = require('../src');
const expect = require('chai').expect;

describe('tracking-parser', () => {
  it('should return imei from TZ-AVL05 data', () => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n');
    const imei = tracking.getImei(raw);
    expect(imei).to.eql('869444005480041');
  });

  it('should return imei from MVT380 data', () => {
    const raw = new Buffer('$$A138,862170013556541,AAA,35,7.092076,79.960473,140412132808,A,10,9,57,275,1,14,5783799,7403612,413|1|F6E0|3933,0000,000B|0009||02D8|0122,*EE\r\n');
    const imei = tracking.getImei(raw);
    expect(imei).to.eql('862170013556541');
  });

  it('should return TZ-AVL05 data parsed', done => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n');
    tracking.parse(raw).then(data => {
      expect(data.raw).to.eql(raw.toString());
      expect(data.device).to.eql('TZ-AVL05');
      expect(data.type).to.eql('data');
      expect(data.imei).to.eql('869444005480041');
      expect(data.alarm.type).to.eql('Gps');
      expect(data.loc.type).to.eql('Point');
      expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
      expect(data.speed).to.eql(0);
      expect(data.gpsStatus).to.be.a.true;
      expect(data.track).to.eql('0.00');
      expect(data.magneticVariation).to.be.null;
      expect(data.gpsMode).to.eql('Autonomous');
      expect(data.pdop).to.eql(2.1);
      expect(data.hdop).to.eql(1.3);
      expect(data.vdop).to.eql(1.7);
      expect(data.status.raw).to.eql('000000000000');
      expect(data.status.sos).to.be.a.false;
      expect(data.status.input['1']).to.be.a.false;
      expect(data.status.input['2']).to.be.a.false;
      expect(data.status.input['3']).to.be.a.false;
      expect(data.status.input['4']).to.be.a.false;
      expect(data.status.input['5']).to.be.a.false;
      expect(data.status.output['1']).to.be.a.false;
      expect(data.status.output['2']).to.be.a.false;
      expect(data.status.charge).to.be.a.true;
      expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
      expect(data.voltage.battery).to.eql(3.98);
      expect(data.voltage.inputCharge).to.eql(11.88);
      expect(data.voltage.ada).to.eql(0);
      expect(data.voltage.adb).to.eql(0);
      expect(data.lac).to.eql(13011);
      expect(data.cid).to.eql(41023);
      expect(data.temperature).to.eql(0);
      expect(data.odometer).to.eql(0.6376);
      expect(data.serialId).to.eql(100);
      expect(data.valid).to.be.a.true;
      expect(data.gps).to.eql('enable');
      expect(data.address).to.eql('Robles 13180, Lo Barnechea');
      done();
    }).catch(err => {
      done(err);
    });
  });

  it('should return MVT380 raw data parsed', done => {
    const raw = new Buffer('$$A138,862170013556541,AAA,35,7.092076,79.960473,140412132808,A,10,9,57,275,1,14,5783799,7403612,413|1|F6E0|3933,0000,000B|0009||02D8|0122,*EE\r\n');
    tracking.parse(raw).then(data => {
      expect(data.raw).to.eql(raw.toString());
      expect(data.device).to.eql('MVT380');
      expect(data.type).to.eql('data');
      expect(data.imei).to.eql(862170013556541);
      expect(data.command).to.eql('AAA');
      expect(data.alarm.type).to.eql('Gps');
      expect(data.loc.type).to.eql('Point');
      expect(data.loc.coordinates).to.eql([79.960473, 7.092076]);
      expect(data.datetime).to.eql(new Date('2014-04-12T13:28:08.000Z'));
      expect(data.gpsSignal).to.eql('A');
      expect(data.satellites).to.eql(10);
      expect(data.gsmSignal).to.eql(9);
      expect(data.speed).to.eql(57);
      expect(data.direction).to.eql(275);
      expect(data.hdop).to.eql(1);
      expect(data.altitude).to.eql(14);
      expect(data.odometer).to.eql(5783799);
      expect(data.runtime).to.eql(7403612);
      expect(data.mcc).to.eql('413');
      expect(data.mnc).to.eql('1');
      expect(data.lac).to.eql(63200);
      expect(data.ci).to.eql(14643);
      expect(data.status.input['1']).to.be.false;
      expect(data.status.input['2']).to.be.false;
      expect(data.status.input['3']).to.be.false;
      expect(data.status.input['4']).to.be.false;
      expect(data.status.input['5']).to.be.false;
      expect(data.status.input['6']).to.be.false;
      expect(data.status.input['7']).to.be.false;
      expect(data.status.input['8']).to.be.false;
      expect(data.status.output['1']).to.be.false;
      expect(data.status.output['2']).to.be.false;
      expect(data.status.output['3']).to.be.false;
      expect(data.status.output['4']).to.be.false;
      expect(data.status.output['5']).to.be.false;
      expect(data.status.output['6']).to.be.false;
      expect(data.status.output['7']).to.be.false;
      expect(data.status.output['8']).to.be.false;
      expect(data.gps).to.eql('enable');
      expect(data.address).to.eql('Ja Ela-Ekala-Gampaha-Yakkala Hwy, Sri Lanka');
      done();
    }).catch(err => {
      done(err);
    });
  });

  it('should return cellocator raw data parsed', done => {
    const raw = new Buffer('4d43475000bdda0b0000060ddf20041017002000e3c40000baeff3c6b6224502000000000000ea65000402090daec5f7cb302cff3357000038090000930a002a170c03e007c1', 'hex');
    tracking.parse(raw).then(data => {
      expect(data.raw).to.eql(raw.toString('hex'));
      expect(data.device).to.eql('CelloTrack');
      expect(data.type).to.eql('data');
      expect(data.loc.type).to.eql('Point');
      expect(data.loc.coordinates).to.eql([-79.09097658351084, -7.953307941260071]);
      expect(data.speed).to.eql(84.96);
      expect(data.datetime).to.eql('2016-03-12T23:42:00.000Z');
      expect(data.direction).to.eql(155.09967514191385);
      expect(data.satellites).to.eql(9);
      expect(data.voltage.ada).to.eql(28.1176470588165);
      expect(data.voltage.adb).to.eql(4.00235293989);
      expect(data.voltage.adc).to.eql(45.41720000000001);
      expect(data.voltage.add).to.eql(182);
      expect(data.altitude).to.eql(223.23000000000002);
      expect(data.status.engine).to.be.false;
      expect(data.status.unlockInactive).to.be.true;
      expect(data.status.panicInactive).to.be.true;
      expect(data.status.drivingStatus).to.be.true;
      expect(data.status.shockInactive).to.be.true;
      expect(data.status.doorInactive).to.be.true;
      expect(data.status.ignitionPortStatus).to.be.true;
      expect(data.status.accelerometerStatus).to.be.true;
      expect(data.status.lock).to.be.true;
      expect(data.version).to.eql('HW: <223>, SW: <32>');
      done();
    }).catch(err => {
      done(err);
    });
  });

  it('should return TZ raw command', () => {
    const data = {
      instruction: 'reboot',
      password: 897463,
      device: 'tz'
    };
    const raw = tracking.parseCommand(data);
    expect(raw).to.eql('*897463,991#');
  });

  it('should return Meitrack raw command', () => {
    const data = {
      instruction: '1_on',
      imei: 353358017784062,
      device: 'meitrack'
    };
    const raw = tracking.parseCommand(data);
    expect(raw).to.match(/^@@([\x41-\x7A])(\d{1,3}),353358017784062,C01,0,10000\*([0-9A-F]{2})\r\n$/);
  });

  it('should return TZ raw command reboot', () => {
    const data = {
      password: 897463,
      device: 'TZ-AVL05'
    };
    const raw = tracking.getRebootCommand(data);
    expect(raw).to.eql('*897463,991#');
  });

  it('should return Meitrack raw command reboot', () => {
    const data = {
      imei: 353358017784062,
      device: 'MVT380'
    };
    const raw = tracking.getRebootCommand(data);
    expect(raw).to.match(/^@@([\x41-\x7A])(\d{1,3}),353358017784062,F02\*([0-9A-F]{2})\r\n$/);
  });
});
