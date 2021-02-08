Imports System.Reflection

Public Class AssemblyInfos
    Public Shared Function GetApplicationName() As String
        Return Assembly.GetExecutingAssembly().GetName().Name
    End Function

    Public Shared Function GetAssemblyVersion() As String
        Return Assembly.GetExecutingAssembly().GetName().Version.ToString()
    End Function
End Class
