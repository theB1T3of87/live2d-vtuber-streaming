package com.theb1t3of87.live2dvtuberstreaming;

import android.app.Activity;
import android.content.Intent;
import android.media.projection.MediaProjectionManager;
import com.getcapacitor.*;
import com.getcapacitor.annotation.*;

@CapacitorPlugin(name = "ScreenRecorder")
public class ScreenRecorderPlugin extends Plugin {
    @PluginMethod
    public void start(PluginCall call) {
        MediaProjectionManager manager = (MediaProjectionManager) getContext()
            .getSystemService(android.content.Context.MEDIA_PROJECTION_SERVICE);
        startActivityForResult(call, manager.createScreenCaptureIntent(), "capturePermissionResult");
    }

    @ActivityCallback
    private void capturePermissionResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null) {
            call.reject("Permissão para gravar a tela não concedida.");
            return;
        }
        Intent service = new Intent(getContext(), ScreenRecordingService.class);
        service.setAction(ScreenRecordingService.ACTION_START);
        service.putExtra(ScreenRecordingService.EXTRA_RESULT_CODE, result.getResultCode());
        service.putExtra(ScreenRecordingService.EXTRA_RESULT_DATA, result.getData());
        try {
            if (android.os.Build.VERSION.SDK_INT >= 26) getContext().startForegroundService(service);
            else getContext().startService(service);
            call.resolve();
        } catch (Exception error) {
            call.reject("Não foi possível iniciar a gravação: " + error.getMessage());
        }
    }

    @PluginMethod public void pause(PluginCall call) {
        ScreenRecordingService.pauseRecording();
        call.resolve();
    }
    @PluginMethod public void resume(PluginCall call) {
        ScreenRecordingService.resumeRecording();
        call.resolve();
    }
    @PluginMethod public void stop(PluginCall call) {
        ScreenRecordingService.stopRecording();
        call.resolve();
    }
}