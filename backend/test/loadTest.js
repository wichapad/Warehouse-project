import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // ramp up to 20 users
    { duration: '1m30s', target: 20 }, // stay at 20 users for 1.5 minutes
    { duration: '20s', target: 0 }, // ramp down to 0 users
  ],
};

export default function () {
  let res = http.get('http://localhost:3000/'); // เปลี่ยน URL ให้ตรงกับแอปพลิเคชันของคุณ
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
