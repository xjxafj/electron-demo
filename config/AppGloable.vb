Imports System.Collections.ObjectModel
Imports System.IO.Ports
Imports System.Text
'整个程序全局变量
Public Module AppGloable

    Public newLineStr As String = Environment.NewLine.ToString() '系统换行字符

    Public Const synS As String = "S" '基因碱基显示符
    Public Const synA As String = "A"
    Public Const synG As String = "G"
    Public Const synC As String = "C"
    Public Const synT As String = "T"

    ''' <summary>
    ''' 阀门串口
    ''' </summary>
    Public COMM1 As SerialPort = New SerialPort(GetINI("COM1", "CommPort", 8, appConfFilePath), 9600, Parity.None, 8, StopBits.One) With {.DiscardNull = False, .DtrEnable = False, .Handshake = Handshake.None, .ParityReplace = 63, .ReadBufferSize = 4096, .ReadTimeout = -1, .ReceivedBytesThreshold = 1, .RtsEnable = False, .WriteBufferSize = 2048, .WriteTimeout = -1} '通信串口 阀门串口
    ''' <summary>
    ''' JD5串口
    ''' </summary>
    Public COMM2 As SerialPort = New SerialPort(GetINI("COM2", "CommPort", 8, appConfFilePath), 9600, Parity.None, 8, StopBits.One) With {.DiscardNull = False, .DtrEnable = False, .Handshake = Handshake.None, .ParityReplace = 63, .ReadBufferSize = 4096, .ReadTimeout = -1, .ReceivedBytesThreshold = 1, .RtsEnable = True, .WriteBufferSize = 2048, .WriteTimeout = -1} '通信串口 JD5

    ''' <summary>
    ''' 光源控制串口
    ''' 
    ''' </summary>
    Public COMM3 As SerialPort = New SerialPort(GetINI("COM3", "CommPort", 8, appConfFilePath), 9600, Parity.None, 8, StopBits.One) With {.DiscardNull = False, .DtrEnable = False, .Handshake = Handshake.None, .ParityReplace = 63, .ReadBufferSize = 4096, .ReadTimeout = -1, .ReceivedBytesThreshold = 1, .RtsEnable = False, .WriteBufferSize = 2048, .WriteTimeout = -1} '通信串口 点光源

    '串口打开
    Public Sub ComOpen()
        Try
            '串口通信初始化
            If COMM1.IsOpen Then
                COMM1.Close()
            End If
            COMM1.Open() '打开串口1 'A3200  IO接口
            If COMM2.IsOpen Then
                COMM2.Close()
            End If
            COMM2.Open() '打开串口1 'A3200  IO接口
            If COMM3.IsOpen Then
                COMM3.Close()
            End If
            COMM3.Open() '打开串口3 '点光源
        Catch ex As Exception
            DebugModule.showError(ex.Message)
        End Try
    End Sub
    '串口关闭
    Public Sub ComClose()
        Try
            '串口通信初始化
            If AppGloable.COMM1.IsOpen Then
                AppGloable.COMM1.Close()
            End If

            If AppGloable.COMM2.IsOpen Then
                AppGloable.COMM2.Close()
            End If

            If AppGloable.COMM3.IsOpen Then
                AppGloable.COMM3.Close()
            End If
        Catch ex As Exception
            DebugModule.showError(ex.Message)
        End Try
    End Sub

End Module
