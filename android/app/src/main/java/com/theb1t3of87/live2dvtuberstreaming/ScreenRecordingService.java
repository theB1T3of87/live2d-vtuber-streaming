package com.theb1t3of87.live2dvtuberstreaming;

import android.app.*;
import android.content.*;
import android.hardware.display.DisplayManager;
import android.hardware.display.VirtualDisplay;
import android.media.MediaRecorder;
import android.media.projection.*;
import android.net.Uri;
import android.os.*;
import android.provider.MediaStore;
import android.util.DisplayMetrics;
import android.view.WindowManager;

public class ScreenRecordingService extends Service {
    public static final String ACTION_START = "com.theb1t3of87.live2dvtuberstreaming.START_RECORDING";
    public static final String EXTRA_RESULT_CODE = "resultCode";
    public static final String EXTRA_RESULT_DATA = "resultData";
    private static final String CHANNEL_ID = "screen_recording";
    private static ScreenRecordingService instance;
    private MediaProjection projection;
    private MediaRecorder recorder;
    private VirtualDisplay virtualDisplay;
    private ParcelFileDescriptor outputDescriptor;
    private Uri outputUri;
    private boolean paused = false;

    @Override public void onCreate() {
        super.onCreate();
        instance = this;
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Gravação de tela", NotificationManager.IMPORTANCE_LOW);
        getSystemService(NotificationManager.class).createNotificationChannel(channel);
    }

    @Override public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && ACTION_START.equals(intent.getAction())) {
            Notification notification = new Notification.Builder(this, CHANNEL_ID)
                .setContentTitle("Gravando a tela")
                .setContentText("Live2D Vtuber Streaming está gravando sua tela.")
                .setSmallIcon(android.R.drawable.presence_video_online)
                .setOngoing(true).build();
            if (Build.VERSION.SDK_INT >= 29) {
                startForeground(7, notification, android.content.pm.ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PROJECTION);
            } else startForeground(7, notification);
            startCapture(intent);
        }
        return START_NOT_STICKY;
    }

    private void startCapture(Intent intent) {
        try {
            int resultCode = intent.getIntExtra(EXTRA_RESULT_CODE, Activity.RESULT_CANCELED);
            Intent data = (Intent) intent.getParcelableExtra(EXTRA_RESULT_DATA);
            MediaProjectionManager manager = (MediaProjectionManager) getSystemService(MEDIA_PROJECTION_SERVICE);
            projection = manager.getMediaProjection(resultCode, data);
            if (projection == null) throw new IllegalStateException("MediaProjection indisponível.");

            DisplayMetrics metrics = new DisplayMetrics();
            WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);
            if (Build.VERSION.SDK_INT >= 30) getDisplay().getRealMetrics(metrics);
            else wm.getDefaultDisplay().getRealMetrics(metrics);
            int width = metrics.widthPixels & ~1;
            int height = metrics.heightPixels & ~1;

            ContentValues values = new ContentValues();
            values.put(MediaStore.Video.Media.DISPLAY_NAME, "Live2D_Recording_" + System.currentTimeMillis() + ".mp4");
            values.put(MediaStore.Video.Media.MIME_TYPE, "video/mp4");
            if (Build.VERSION.SDK_INT >= 29) {
                values.put(MediaStore.Video.Media.RELATIVE_PATH, "Movies/Live2D Vtuber Streaming");
                values.put(MediaStore.Video.Media.IS_PENDING, 1);
            }
            outputUri = getContentResolver().insert(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, values);
            if (outputUri == null) throw new IllegalStateException("Não foi possível criar o vídeo na galeria.");
            outputDescriptor = getContentResolver().openFileDescriptor(outputUri, "w");
            if (outputDescriptor == null) throw new IllegalStateException("Não foi possível abrir o arquivo de vídeo.");

            recorder = new MediaRecorder();
            recorder.setVideoSource(MediaRecorder.VideoSource.SURFACE);
            recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
            recorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
            recorder.setVideoSize(width, height);
            recorder.setVideoFrameRate(30);
            recorder.setVideoEncodingBitRate(8 * 1000 * 1000);
            recorder.setOutputFile(outputDescriptor.getFileDescriptor());
            recorder.prepare();
            virtualDisplay = projection.createVirtualDisplay("Live2DScreenRecording", width, height,
                metrics.densityDpi, DisplayManager.VIRTUAL_DISPLAY_FLAG_AUTO_MIRROR,
                recorder.getSurface(), null, null);
            recorder.start();
        } catch (Exception error) {
            android.util.Log.e("ScreenRecording", "Start failed", error);
            cleanup(false);
            stopSelf();
        }
    }

    public static void pauseRecording() {
        if (instance == null || instance.recorder == null || instance.paused) return;
        if (Build.VERSION.SDK_INT >= 24) try { instance.recorder.pause(); instance.paused = true; } catch (Exception ignored) {}
    }
    public static void resumeRecording() {
        if (instance == null || instance.recorder == null || !instance.paused) return;
        if (Build.VERSION.SDK_INT >= 24) try { instance.recorder.resume(); instance.paused = false; } catch (Exception ignored) {}
    }
    public static void stopRecording() {
        if (instance != null) { instance.cleanup(true); instance.stopSelf(); }
    }

    private void cleanup(boolean save) {
        try { if (recorder != null) recorder.stop(); } catch (Exception ignored) {}
        try { if (recorder != null) recorder.reset(); } catch (Exception ignored) {}
        try { if (recorder != null) recorder.release(); } catch (Exception ignored) {}
        recorder = null;
        try { if (virtualDisplay != null) virtualDisplay.release(); } catch (Exception ignored) {}
        virtualDisplay = null;
        try { if (projection != null) projection.stop(); } catch (Exception ignored) {}
        projection = null;
        try { if (outputDescriptor != null) outputDescriptor.close(); } catch (Exception ignored) {}
        outputDescriptor = null;
        if (outputUri != null) {
            if (save) {
                ContentValues values = new ContentValues();
                if (Build.VERSION.SDK_INT >= 29) values.put(MediaStore.Video.Media.IS_PENDING, 0);
                getContentResolver().update(outputUri, values, null, null);
            } else getContentResolver().delete(outputUri, null, null);
            outputUri = null;
        }
        paused = false;
        stopForeground(true);
        instance = null;
    }
    @Override public void onDestroy() {
        if (recorder != null) cleanup(true);
        instance = null;
        super.onDestroy();
    }
    @Override public IBinder onBind(Intent intent) { return null; }
}