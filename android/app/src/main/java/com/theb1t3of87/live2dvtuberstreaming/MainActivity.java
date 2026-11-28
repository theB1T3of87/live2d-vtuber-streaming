package com.theb1t3of87.live2dvtuberstreaming;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override public void onCreate(android.os.Bundle savedInstanceState) {
        registerPlugin(ScreenRecorderPlugin.class);
        super.onCreate(savedInstanceState);
    }
}