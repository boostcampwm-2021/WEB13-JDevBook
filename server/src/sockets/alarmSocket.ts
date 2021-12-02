import dbManager from '../service/dbManager';

const alarmSocket = ({ socket, io }: any) => {
  socket.on('send alarm initial', async (receivedData: { receiver: string }) => {
    const { receiver } = receivedData;
    const previousAlarms = await dbManager.getAlarmList(receiver);
    io.emit('get previous alarms', previousAlarms);
    const uncheckedAlarmsNum = await dbManager.getUncheckedAlarmsNum(receiver);
    io.emit('get number of unchecked alarms', uncheckedAlarmsNum);
  });

  socket.on('send alarm', async (receivedData: { sender: string; receiver: string; type: string; text: string }) => {
    const { sender, receiver, type, text } = receivedData;
    const msg = `${sender}:${type}:${text}`;

    if (sender !== receiver) await dbManager.addAlarm(receiver, msg);
    io.emit('get alarm', receivedData);
    io.emit('get alarm info', receivedData);
  });

  socket.on('make alarms check', async (receivedData: { receiver: string }) => {
    const { receiver } = receivedData;
    await dbManager.setAlarmCheck(receiver);
  });
};

export default alarmSocket;
